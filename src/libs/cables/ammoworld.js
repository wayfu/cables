// https://stackoverflow.com/questions/12251199/re-positioning-a-rigid-body-in-bullet-physics

// https://github.com/InfiniteLee/ammo-debug-drawer

const AmmoWorld = class extends CABLES.EventTarget
{
    constructor()
    {
        super();
        this.world = null;
        this.debugDrawer = null;
        this.bodies = [];
        this._countIndex = 1;
        this._bodymeta = {};
        this.lastTime = performance.now();

        try
        {
            Ammo().then(() => { this.setupWorld(); });
        }
        catch (e)
        {
            console.log("ammo already exists ...");
            if (Ammo) this.setupWorld();
            else console.log(e);
        }
    }

    setupWorld()
    {
        console.log(Ammo);
        this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
        this.overlappingPairCache = new Ammo.btDbvtBroadphase();
        this.solver = new Ammo.btSequentialImpulseConstraintSolver();

        this.world = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfiguration);

        this.world.setGravity(new Ammo.btVector3(0, -9, 0));

        this.debugDrawer = new AmmoDebugDrawer(this.world, { });
        this.debugDrawer.enable();
        // this.debugDrawer.setDebugMode(1);

        console.log("world setup done");
        console.log(this.world);
    }

    dispose()
    {
        if (!this.world) return;

        for (let i = 0; i < this.bodies.length; i++)
        {
            if (this.bodies[i])
            {
                this.world.removeRigidBody(this.bodies[i]);
                Ammo.destroy(this.bodies[i]);
            }
        }
        this.bodies = [];

        Ammo.destroy(this.world);
        this.world = null;
        Ammo.destroy(this.collisionConfiguration);
        Ammo.destroy(this.dispatcher);
        Ammo.destroy(this.overlappingPairCache);
        Ammo.destroy(this.solver);
    }

    removeRigidBody(b)
    {
        if (this.world && b)
        {
            this.world.removeRigidBody(b);
        }
        const idx = this.bodies.indexOf(b);
        if (idx > -1) this.bodies.splice(idx, 1);
    }

    createRigidBody()
    {

    }

    addRigidBody(body)
    {
        body.setUserIndex(++this._countIndex);
        this.world.addRigidBody(body);
        this.bodies.push(body);

        console.log(body);
    }

    setBodyMeta(body, meta)
    {
        if (body.getUserIndex() == 0)body.setUserIndex(++this._countIndex);
        meta.body = body;
        this._bodymeta[body.getUserIndex()] = meta;
    }

    getBodyMeta(body)
    {
        return this._bodymeta[body.getUserIndex()];
    }

    getBodyByName(n)
    {
        for (let i in this._bodymeta)
        {
            if (this._bodymeta[i].name == n) return this._bodymeta[i].body;
        }
    }

    numBodies()
    {
        return this.bodies.length;
    }

    frame()
    {
        if (!this.world) return;
        let deltaTime = performance.now() - this.lastTime;

        this.world.stepSimulation(deltaTime, 10);

        this.lastTime = performance.now();
    }

    activateAllBodies()
    {
        for (let i = 0; i < this.bodies.length; i++)
        {
            this.bodies[i].activate();
        }
    }

    renderDebug(cgl)
    {
        if (!this.debugDrawer) return;
        this.debugDrawer.update();
        this.debugDrawer.render(cgl);
    }
};

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AmmoDebugConstants = {
    "NoDebug": 0,
    "DrawWireframe": 1,
    "DrawAabb": 2,
    "DrawFeaturesText": 4,
    "DrawContactPoints": 8,
    "NoDeactivation": 16,
    "NoHelpText": 32,
    "DrawText": 64,
    "ProfileTimings": 128,
    "EnableSatComparison": 256,
    "DisableBulletLCP": 512,
    "EnableCCD": 1024,
    "DrawConstraints": 1 << 11, // 2048
    "DrawConstraintLimits": 1 << 12, // 4096
    "FastWireframe": 1 << 13, // 8192
    "DrawNormals": 1 << 14, // 16384
    "MAX_DEBUG_DRAW_MODE": 0xffffffff
};


class AmmoDebugDrawer
{
    constructor(world, options)
    {
        this.world = world;
        options = options || {};

        this.verts = [];
        this._lineGeom = null;
        this._lineMesh = null;
        this.debugDrawMode = options.debugDrawMode || AmmoDebugConstants.DrawWireframe;

        this.index = 0;
        // if (this.indexArray)
        // {
        //     Atomics.store(this.indexArray, 0, this.index);
        // }

        this.enabled = true;


        this.debugDrawer = new Ammo.DebugDrawer();
        this.debugDrawer.drawLine = this.drawLine.bind(this);
        this.debugDrawer.drawTriangle = this.drawTriangle.bind(this);
        this.debugDrawer.drawContactPoint = this.drawContactPoint.bind(this);
        this.debugDrawer.reportErrorWarning = this.reportErrorWarning.bind(this);
        this.debugDrawer.draw3dText = this.draw3dText.bind(this);
        this.debugDrawer.setDebugMode = this.setDebugMode.bind(this);
        this.debugDrawer.getDebugMode = this.getDebugMode.bind(this);
        this.debugDrawer.enable = this.enable.bind(this);
        this.debugDrawer.disable = this.disable.bind(this);
        this.debugDrawer.update = this.update.bind(this);
        this.debugDrawer.enabled = true;
        this.world.setDebugDrawer(this.debugDrawer);

        console.log("this.getDebugMode", this.getDebugMode(), this.enabled);


        this._lineShader = null;
        this._shaderFrag = ""
            .endl() + "precision highp float;"
            .endl() + "IN vec4 vertCol;"

            .endl() + "void main()"
            .endl() + "{"
            .endl() + "    outColor = vertCol;"
            .endl() + "}";

        this._shaderVert = ""
            .endl() + "IN vec3 vPosition;"
            .endl() + "UNI mat4 projMatrix;"
            .endl() + "UNI mat4 mvMatrix;"
            .endl() + "OUT vec4 vertCol;"
            .endl() + "IN vec4 attrVertColor;"

            .endl() + "void main()"
            .endl() + "{"
            .endl() + "   vec4 pos=vec4(vPosition, 1.0);"
            .endl() + "   vertCol=attrVertColor;"
            .endl() + "   gl_PointSize=10.0;"

            .endl() + "   gl_Position = projMatrix * mvMatrix * pos;"
            .endl() + "}";
    }

    enable()
    {
        this.enabled = true;
    }

    disable()
    {
        this.enabled = false;
    }

    render(cgl)
    {
        if (!this.enabled)
        {
            return;
        }

        if (!this._lineShader)
        {
            this._lineShader = new CGL.Shader(cgl, "ammoDebugLineShader");
            this._lineShader.setSource(this._shaderVert, this._shaderFrag);
        }

        if (!this._lineGeom)
        {
            this._lineGeom = new CGL.Geometry("ammoDebugLines");
            this._lineMesh = new CGL.Mesh(cgl, this._lineGeom, cgl.gl.LINES);
            this._lineMesh.setGeom(this._lineGeom);
            this._lineGeom.vertices = [];

            this._pointGeom = new CGL.Geometry("ammoDebugPoints");
            this._pointMesh = new CGL.Mesh(cgl, this._pointGeom, cgl.gl.LINES);
            this._pointMesh.setGeom(this._pointGeom);
            this._pointGeom.vertices = [];
        }

        this._lineShader.glPrimitive = cgl.gl.LINES;
        this._lineMesh.render(this._lineShader);

        this._lineShader.glPrimitive = cgl.gl.POINTS;
        this._pointMesh.render(this._lineShader);
    }

    update()
    {
        if (!this._lineGeom) return;

        this.index = 0;
        this.verts = [];
        this.vertCols = [];

        this.indexPoints = 0;
        this.vertPoints = [];
        this.vertPointCols = [];

        this.world.debugDrawWorld();

        // console.log("upd", this.index);
        // console.log(this._lineGeom.vertices);
        this._lineGeom.setPointVertices(this.verts);
        this._lineGeom.vertexColors = this.vertCols;
        this._lineMesh.setGeom(this._lineGeom);

        this._pointGeom.setPointVertices(this.vertPoints);
        this._pointGeom.vertexColors = this.vertPointCols;
        this._pointMesh.setGeom(this._pointGeom);


        // this._lineMesh.setAttribute(CGL.SHADERVAR_VERTEX_COLOR || "attrVertColor", this.vertCols, 4);
        // this._lineMesh.setAttribute(CGL.SHADERVAR_VERTEX_POSITION, this.verts, 3);
        // this._lineMesh.setAttribute(CGL.SHADERVAR_VERTEX_COLOR || "attrVertColor", this.vertCols, 4);
    }


    // virtual void   drawContactPoint(const btVector3& PointOnB, const btVector3& normalOnB, btScalar distance, int lifeTime, const btVector3& color);

    drawContactPoint(pointOnB, normalOnB, distance, lifeTime, color)
    {
        // AmmoDebugDrawer.prototype.drawContactPoint = function(pointOnB, normalOnB, distance, lifeTime, color) {
        const heap = Ammo.HEAPF32;
        const r = heap[(color + 0) / 4];
        const g = heap[(color + 4) / 4];
        const b = heap[(color + 8) / 4];

        const x = heap[(pointOnB + 0) / 4];
        const y = heap[(pointOnB + 4) / 4];
        const z = heap[(pointOnB + 8) / 4];

        let idx = this.indexPoints * 3;
        let idxc = this.indexPoints * 4;

        this.vertPoints[idx + 0] = x;
        this.vertPoints[idx + 1] = y;
        this.vertPoints[idx + 2] = z;

        this.vertPointCols[idxc + 0] = r;
        this.vertPointCols[idxc + 1] = g;
        this.vertPointCols[idxc + 2] = b;
        this.vertPointCols[idxc + 3] = 1;
        this.indexPoints++;
    }

    // virtual void   drawTriangle(const btVector3& a, const btVector3& b, const btVector3& c, const btVector3& color, btScalar alpha);
    drawTriangle(a, b, c, color)
    {
        console.log("draw triangle!");
        this.drawLine(a, b, color);
        this.drawLine(b, c, color);
        this.drawLine(a, c, color);
    }

    drawLine(from, to, color)
    {
        let idx = this.index * 3;
        let idxCol = this.index * 4;

        const heap = Ammo.HEAPF32;
        const r = heap[(color + 0) / 4];
        const g = heap[(color + 4) / 4];
        const b = heap[(color + 8) / 4];

        this.vertCols[idxCol + 0] = r;
        this.vertCols[idxCol + 1] = g;
        this.vertCols[idxCol + 2] = b;
        this.vertCols[idxCol + 3] = 0.6;

        const fromX = heap[(from + 0) / 4];
        const fromY = heap[(from + 4) / 4];
        const fromZ = heap[(from + 8) / 4];

        this.verts[idx + 0] = fromX;
        this.verts[idx + 1] = fromY;
        this.verts[idx + 2] = fromZ;


        // setXYZ(this.verticesArray, this.index, fromX, fromY, fromZ);
        // setXYZ(this.colorsArray, this.index++, r, g, b);

        const toX = heap[(to + 0) / 4];
        const toY = heap[(to + 4) / 4];
        const toZ = heap[(to + 8) / 4];

        this.index++;
        idx = this.index * 3;
        idxCol = this.index * 4;
        this.verts[idx + 0] = toX;
        this.verts[idx + 1] = toY;
        this.verts[idx + 2] = toZ;

        this.vertCols[idxCol + 0] = r;
        this.vertCols[idxCol + 1] = g;
        this.vertCols[idxCol + 2] = b;
        this.vertCols[idxCol + 3] = 0.6;

        this.index++;

        // setXYZ(this.verticesArray, this.index, toX, toY, toZ);
        // setXYZ(this.colorsArray, this.index++, r, g, b);

        // console.log("line!", from, to, color);
    }

    // TODO: figure out how to make lifeTime work
    // drawContactPoint(pointOnB, normalOnB, distance, lifeTime, color)
    // {
    //     // const heap = Ammo.HEAPF32;
    //     // const r = heap[(color + 0) / 4];
    //     // const g = heap[(color + 4) / 4];
    //     // const b = heap[(color + 8) / 4];

    //     // const x = heap[(pointOnB + 0) / 4];
    //     // const y = heap[(pointOnB + 4) / 4];
    //     // const z = heap[(pointOnB + 8) / 4];
    //     // setXYZ(this.verticesArray, this.index, x, y, z);
    //     // setXYZ(this.colorsArray, this.index++, r, g, b);

    //     // const dx = heap[(normalOnB + 0) / 4] * distance;
    //     // const dy = heap[(normalOnB + 4) / 4] * distance;
    //     // const dz = heap[(normalOnB + 8) / 4] * distance;
    //     // setXYZ(this.verticesArray, this.index, x + dx, y + dy, z + dz);
    //     // setXYZ(this.colorsArray, this.index++, r, g, b);
    // }

    reportErrorWarning(warningString)
    {
        if (Ammo.hasOwnProperty("UTF8ToString"))
        {
            console.warn(Ammo.UTF8ToString(warningString));
        }
        else if (!this.warnedOnce)
        {
            this.warnedOnce = true;
            console.warn("Cannot print warningString, please export UTF8ToString from Ammo.js in make.py");
        }
    }

    draw3dText(location, textString)
    {
    // TODO
        console.warn("TODO: draw3dText");
    }

    setDebugMode(debugMode)
    {
        this.debugDrawMode = debugMode;
    }

    getDebugMode()
    {
        return this.debugDrawMode;
    }
}


AmmoWorld._getGeomTriangle = function (geom, i)
{
    const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (geom.verticesIndices && geom.verticesIndices.length)
    {
        const i3 = i * 3;
        const i13 = (i + 1) * 3;
        const i23 = (i + 2) * 3;
        arr[0] = geom.vertices[geom.verticesIndices[i3] * 3 + 0];
        arr[1] = geom.vertices[geom.verticesIndices[i3] * 3 + 1];
        arr[2] = geom.vertices[geom.verticesIndices[i3] * 3 + 2];

        arr[3] = geom.vertices[geom.verticesIndices[i13] * 3 + 0];
        arr[4] = geom.vertices[geom.verticesIndices[i13] * 3 + 1];
        arr[5] = geom.vertices[geom.verticesIndices[i13] * 3 + 2];

        arr[6] = geom.vertices[geom.verticesIndices[i23] * 3 + 0];
        arr[7] = geom.vertices[geom.verticesIndices[i23] * 3 + 1];
        arr[8] = geom.vertices[geom.verticesIndices[i23] * 3 + 2];
    }
    else
    {
        arr[0] = geom.vertices[i * 9 + 0];
        arr[1] = geom.vertices[i * 9 + 1];
        arr[2] = geom.vertices[i * 9 + 2];

        arr[3] = geom.vertices[i * 9 + 3];
        arr[4] = geom.vertices[i * 9 + 4];
        arr[5] = geom.vertices[i * 9 + 5];

        arr[6] = geom.vertices[i * 9 + 6];
        arr[7] = geom.vertices[i * 9 + 7];
        arr[8] = geom.vertices[i * 9 + 8];
    }

    return arr;
};

AmmoWorld.createConvexHullFromGeom = function (geom, numTris, scale)
{
    scale = scale || [1, 1, 1];
    const colShape = new Ammo.btConvexHullShape();
    const _vec3_1 = new Ammo.btVector3(0, 0, 0);
    const _vec3_2 = new Ammo.btVector3(0, 0, 0);
    const _vec3_3 = new Ammo.btVector3(0, 0, 0);

    let step = 1;

    if (geom.vertices.length / 3 > numTris && numTris > 0)
    {
        step = Math.floor(geom.vertices.length / 3 / numTris);
    }

    console.log("num t", step);
    for (let i = 0; i < geom.vertices.length / 3; i += step)
    {
        _vec3_1.setX(geom.vertices[i * 3 + 0] * scale[0]);
        _vec3_1.setY(geom.vertices[i * 3 + 1] * scale[1]);
        _vec3_1.setZ(geom.vertices[i * 3 + 2] * scale[2]);
        colShape.addPoint(_vec3_1, true); // todo: only set true on last vertex

        // const triangle = this._getGeomTriangle(geom, i);

        // _vec3_1.setX(triangle[0] * scale[0]);
        // _vec3_1.setY(triangle[1] * scale[1]);
        // _vec3_1.setZ(triangle[2] * scale[2]);
        // colShape.addPoint(_vec3_1, false);

        // _vec3_2.setX(triangle[3] * scale[0]);
        // _vec3_2.setY(triangle[4] * scale[1]);
        // _vec3_2.setZ(triangle[5] * scale[2]);
        // colShape.addPoint(_vec3_2, false);

        // _vec3_3.setX(triangle[6] * scale[0]);
        // _vec3_3.setY(triangle[7] * scale[1]);
        // _vec3_3.setZ(triangle[8] * scale[2]);
        // colShape.addPoint(_vec3_3, true);

        // triangle_mesh.addTriangle(
        //     _vec3_1,
        //     _vec3_2,
        //     _vec3_3,
        //     true
        // );
    }
    // colShape.optimizeConvexHull();

    colShape.initializePolyhedralFeatures();

    Ammo.destroy(_vec3_1);
    Ammo.destroy(_vec3_2);
    Ammo.destroy(_vec3_3);

    return colShape;
};


AmmoWorld.copyCglTransform = function (cgl, transform)
{
    // if (!btOrigin)
    // {
    const btOrigin = new Ammo.btVector3(0, 0, 0);
    const btQuat = new Ammo.btQuaternion(0, 0, 0, 1);
    // }

    const tmpOrigin = vec3.create();
    const tmpQuat = quat.create();

    mat4.getTranslation(tmpOrigin, cgl.mMatrix);
    mat4.getRotation(tmpQuat, cgl.mMatrix);
    // quat.invert(tmpQuat, tmpQuat);


    // console.log(tmpQuat);
    //    let changed = false;

    btOrigin.setValue(tmpOrigin[0], tmpOrigin[1], tmpOrigin[2]);
    btQuat.setValue(tmpQuat[0], tmpQuat[1], tmpQuat[2], tmpQuat[3]);

    transform.setOrigin(btOrigin);
    transform.setRotation(btQuat);

    Ammo.destroy(btOrigin);
    Ammo.destroy(btQuat);
};

CABLES.AmmoWorld = AmmoWorld;
