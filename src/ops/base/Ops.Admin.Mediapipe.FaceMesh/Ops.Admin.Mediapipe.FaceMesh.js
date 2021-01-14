const
    inGeom=op.inObject("Geom"),
    inPoints=op.inArray("Points"),
    outGeom=op.outObject("result geom");


inPoints.onChange=()=>
{
    const points=inPoints.get();

    if(points && g)
    {
        for(let i=0;i<g.vertices.length;i+=3)
        {
            g.vertices[i+0]=points[i+0];
            g.vertices[i+1]=points[i+1];
        }

        outGeom.set(null);
        outGeom.set(g);
    }
};



const verts=[
0.000000, -3.406404, 5.979507,
0.000000, -1.126865, 7.475604,
0.000000, -2.089024, 6.058267,
-0.463928, 0.955357, 6.633583,
0.000000, -0.463170, 7.586580,
0.000000, 0.365669, 7.242870,
0.000000, 2.473255, 5.788627,
-4.253081, 2.577646, 3.279702,
0.000000, 4.019042, 5.284764,
0.000000, 4.885979, 5.385258,
0.000000, 8.261778, 4.481535,
0.000000, -3.706811, 5.864924,
0.000000, -3.918301, 5.569430,
0.000000, -3.994436, 5.219482,
0.000000, -4.542400, 5.404754,
0.000000, -4.745577, 5.529457,
0.000000, -5.019567, 5.601448,
0.000000, -5.365123, 5.535441,
0.000000, -6.149624, 5.071372,
0.000000, -1.501095, 7.112196,
-0.416106, -1.466449, 6.447657,
-7.087960, 5.434801, 0.099620,
-2.628639, 2.035898, 3.848121,
-3.198363, 1.985815, 3.796952,
-3.775151, 2.039402, 3.646194,
-4.465819, 2.422950, 3.155168,
-2.164289, 2.189867, 3.851822,
-3.208229, 3.223926, 4.115822,
-2.673803, 3.205337, 4.092203,
-3.745193, 3.165286, 3.972409,
-4.161018, 3.059069, 3.719554,
-5.062006, 1.934418, 2.776093,
-2.266659, -7.425768, 4.389812,
-4.445859, 2.663991, 3.173422,
-7.214530, 2.263009, 0.073150,
-5.799793, 2.349546, 2.204059,
-2.844939, -0.720868, 4.433130,
-0.711452, -3.329355, 5.877044,
-0.606033, -3.924562, 5.444923,
-1.431615, -3.500953, 5.496189,
-1.914910, -3.803146, 5.028930,
-1.131043, -3.973937, 5.189648,
-1.563548, -4.082763, 4.842263,
-2.650112, -5.003649, 4.188483,
-0.427049, -1.094134, 7.360529,
-0.496396, -0.475659, 7.440358,
-5.253307, 3.881582, 3.363159,
-1.718698, 0.974609, 4.558359,
-1.608635, -0.942516, 5.814193,
-1.651267, -0.610868, 5.581319,
-4.765501, -0.701554, 3.534632,
-0.478306, 0.295766, 7.101013,
-3.734964, 4.508230, 4.550454,
-4.588603, 4.302037, 4.048484,
-6.279331, 6.615427, 1.425850,
-1.220941, 4.142165, 5.106035,
-2.193489, 3.100317, 4.000575,
-3.102642, -4.352984, 4.095905,
-6.719682, -4.788645, -1.745401,
-1.193824, -1.306795, 5.737747,
-0.729766, -1.593712, 5.833208,
-2.456206, -4.342621, 4.283884,
-2.204823, -4.304508, 4.162499,
-4.985894, 4.802461, 3.751977,
-1.592294, -1.257709, 5.456949,
-2.644548, 4.524654, 4.921559,
-2.760292, 5.100971, 5.015990,
-3.523964, 8.005976, 3.729163,
-5.599763, 5.715470, 2.724259,
-3.063932, 6.566144, 4.529981,
-5.720968, 4.254584, 2.830852,
-6.374393, 4.785590, 1.591691,
-0.672728, -3.688016, 5.737804,
-1.262560, -3.787691, 5.417779,
-1.732553, -3.952767, 5.000579,
-1.043625, -1.464973, 5.662455,
-2.321234, -4.329069, 4.258156,
-2.056846, -4.477671, 4.520883,
-2.153084, -4.276322, 4.038093,
-0.946874, -1.035249, 6.512274,
-1.469132, -4.036351, 4.604908,
-1.024340, -3.989851, 4.926693,
-0.533422, -3.993222, 5.138202,
-0.769720, -6.095394, 4.985883,
-0.699606, -5.291850, 5.448304,
-0.669687, -4.949770, 5.509612,
-0.630947, -4.695101, 5.449371,
-0.583218, -4.517982, 5.339869,
-1.537170, -4.423206, 4.745470,
-1.615600, -4.475942, 4.813632,
-1.729053, -4.618680, 4.854463,
-1.838624, -4.828746, 4.823737,
-2.368250, -3.106237, 4.868096,
-7.542244, -1.049282, -2.431321,
0.000000, -1.724003, 6.601390,
-1.826614, -4.399531, 4.399021,
-1.929558, -4.411831, 4.497052,
-0.597442, -2.013686, 5.866456,
-1.405627, -1.714196, 5.241087,
-0.662449, -1.819321, 5.863759,
-2.342340, 0.572222, 4.294303,
-3.327324, 0.104863, 4.113860,
-1.726175, -0.919165, 5.273355,
-5.133204, 7.485602, 2.660442,
-4.538641, 6.319907, 3.683424,
-3.986562, 5.109487, 4.466315,
-2.169681, -5.440433, 4.455874,
-1.395634, 5.011963, 5.316032,
-1.619500, 6.599217, 4.921106,
-1.891399, 8.236377, 4.274997,
-4.195832, 2.235205, 3.375099,
-5.733342, 1.411738, 2.431726,
-1.859887, 2.355757, 3.843181,
-4.988612, 3.074654, 3.083858,
-1.303263, 1.416453, 4.831091,
-1.305757, -0.672779, 6.415959,
-6.465170, 0.937119, 1.689873,
-5.258659, 0.945811, 2.974312,
-4.432338, 0.722096, 3.522615,
-3.300681, 0.861641, 3.872784,
-2.430178, 1.131492, 4.039035,
-1.820731, 1.467954, 4.224124,
-0.563221, 2.307693, 5.566789,
-6.338145, -0.529279, 1.881175,
-5.587698, 3.208071, 2.687839,
-0.242624, -1.462857, 7.071491,
-1.611251, 0.339326, 4.895421,
-7.743095, 2.364999, -2.005167,
-1.391142, 1.851048, 4.448999,
-1.785794, -0.978284, 4.850470,
-4.670959, 2.664461, 3.084075,
-1.333970, -0.283761, 6.097047,
-7.270895, -2.890917, -2.252455,
-1.856432, 2.585245, 3.757904,
-0.923388, 0.073076, 6.671944,
-5.000589, -6.135128, 1.892523,
-5.085276, -7.178590, 0.714711,
-7.159291, -0.811820, -0.072044,
-5.843051, -5.248023, 0.924091,
-6.847258, 3.662916, 0.724695,
-2.412942, -8.258853, 4.119213,
-0.179909, -1.689864, 6.573301,
-2.103655, -0.163946, 4.566119,
-6.407571, 2.236021, 1.560843,
-3.670075, 2.360153, 3.635230,
-3.177186, 2.294265, 3.775704,
-2.196121, -4.598322, 4.479786,
-6.234883, -1.944430, 1.663542,
-1.292924, -9.295920, 4.094063,
-3.210651, -8.533278, 2.802001,
-4.068926, -7.993109, 1.925119,
0.000000, 6.545390, 5.027311,
0.000000, -9.403378, 4.264492,
-2.724032, 2.315802, 3.777151,
-2.288460, 2.398891, 3.697603,
-1.998311, 2.496547, 3.689148,
-6.130040, 3.399261, 2.038516,
-2.288460, 2.886504, 3.775031,
-2.724032, 2.961810, 3.871767,
-3.177186, 2.964136, 3.876973,
-3.670075, 2.927714, 3.724325,
-4.018389, 2.857357, 3.482983,
-7.555811, 4.106811, -0.991917,
-4.018389, 2.483695, 3.440898,
0.000000, -2.521945, 5.932265,
-1.776217, -2.683946, 5.213116,
-1.222237, -1.182444, 5.952465,
-0.731493, -2.536683, 5.815343,
0.000000, 3.271027, 5.236015,
-4.135272, -6.996638, 2.671970,
-3.311811, -7.660815, 3.382963,
-1.313701, -8.639995, 4.702456,
-5.940524, -6.223629, -0.631468,
-1.998311, 2.743838, 3.744030,
-0.901447, 1.236992, 5.754256,
0.000000, -8.765243, 4.891441,
-2.308977, -8.974196, 3.609070,
-6.954154, -2.439843, -0.131163,
-1.098819, -4.458788, 5.120727,
-1.181124, -4.579996, 5.189564,
-1.255818, -4.787901, 5.237051,
-1.325085, -5.106507, 5.205010,
-1.546388, -5.819392, 4.757893,
-1.953754, -4.183892, 4.431713,
-2.117802, -4.137093, 4.555096,
-2.285339, -4.051196, 4.582438,
-2.850160, -3.665720, 4.484994,
-5.278538, -2.238942, 2.861224,
-0.946709, 1.907628, 5.196779,
-1.314173, 3.104912, 4.231404,
-1.780000, 2.860000, 3.881555,
-1.845110, -4.098880, 4.247264,
-5.436187, -4.030482, 2.109852,
-0.766444, 3.182131, 4.861453,
-1.938616, -6.614410, 4.521085,
0.000000, 1.059413, 6.774605,
-0.516573, 1.583572, 6.148363,
0.000000, 1.728369, 6.316750,
-1.246815, 0.230297, 5.681036,
0.000000, -7.942194, 5.181173,
0.000000, -6.991499, 5.153478,
-0.997827, -6.930921, 4.979576,
-3.288807, -5.382514, 3.795752,
-2.311631, -1.566237, 4.590085,
-2.680250, -6.111567, 4.096152,
-3.832928, -1.537326, 4.137731,
-2.961860, -2.274215, 4.440943,
-4.386901, -2.683286, 3.643886,
-1.217295, -7.834465, 4.969286,
-1.542374, -0.136843, 5.201008,
-3.878377, -6.041764, 3.311079,
-3.084037, -6.809842, 3.814195,
-3.747321, -4.503545, 3.726453,
-6.094129, -3.205991, 1.473482,
-4.588995, -4.728726, 2.983221,
-6.583231, -3.941269, 0.070268,
-3.492580, -3.195820, 4.130198,
-1.255543, 0.802341, 5.307551,
-1.126122, -0.933602, 6.538785,
-1.443109, -1.142774, 5.905127,
-0.923043, -0.529042, 7.003423,
-1.755386, 3.529117, 4.327696,
-2.632589, 3.713828, 4.364629,
-3.388062, 3.721976, 4.309028,
-4.075766, 3.675413, 4.076063,
-4.622910, 3.474691, 3.646321,
-5.171755, 2.535753, 2.670867,
-7.297331, 0.763172, -0.048769,
-4.706828, 1.651000, 3.109532,
-4.071712, 1.476821, 3.476944,
-3.269817, 1.470659, 3.731945,
-2.527572, 1.617311, 3.865444,
-1.970894, 1.858505, 3.961782,
-1.579543, 2.097941, 4.084996,
-7.664182, 0.673132, -2.435867,
-1.397041, -1.340139, 5.630378,
-0.884838, 0.658740, 6.233232,
-0.767097, -0.968035, 7.077932,
-0.460213, -1.334106, 6.787447,
-0.748618, -1.067994, 6.798303,
-1.236408, -1.585568, 5.480490,
-0.387306, -1.409990, 6.957705,
-0.319925, -1.607931, 6.508676,
-1.639633, 2.556298, 3.863736,
-1.255645, 2.467144, 4.203800,
-1.031362, 2.382663, 4.615849,
-4.253081, 2.772296, 3.315305,
-4.530000, 2.910000, 3.339685,
0.463928, 0.955357, 6.633583,
4.253081, 2.577646, 3.279702,
0.416106, -1.466449, 6.447657,
7.087960, 5.434801, 0.099620,
2.628639, 2.035898, 3.848121,
3.198363, 1.985815, 3.796952,
3.775151, 2.039402, 3.646194,
4.465819, 2.422950, 3.155168,
2.164289, 2.189867, 3.851822,
3.208229, 3.223926, 4.115822,
2.673803, 3.205337, 4.092203,
3.745193, 3.165286, 3.972409,
4.161018, 3.059069, 3.719554,
5.062006, 1.934418, 2.776093,
2.266659, -7.425768, 4.389812,
4.445859, 2.663991, 3.173422,
7.214530, 2.263009, 0.073150,
5.799793, 2.349546, 2.204059,
2.844939, -0.720868, 4.433130,
0.711452, -3.329355, 5.877044,
0.606033, -3.924562, 5.444923,
1.431615, -3.500953, 5.496189,
1.914910, -3.803146, 5.028930,
1.131043, -3.973937, 5.189648,
1.563548, -4.082763, 4.842263,
2.650112, -5.003649, 4.188483,
0.427049, -1.094134, 7.360529,
0.496396, -0.475659, 7.440358,
5.253307, 3.881582, 3.363159,
1.718698, 0.974609, 4.558359,
1.608635, -0.942516, 5.814193,
1.651267, -0.610868, 5.581319,
4.765501, -0.701554, 3.534632,
0.478306, 0.295766, 7.101013,
3.734964, 4.508230, 4.550454,
4.588603, 4.302037, 4.048484,
6.279331, 6.615427, 1.425850,
1.220941, 4.142165, 5.106035,
2.193489, 3.100317, 4.000575,
3.102642, -4.352984, 4.095905,
6.719682, -4.788645, -1.745401,
1.193824, -1.306795, 5.737747,
0.729766, -1.593712, 5.833208,
2.456206, -4.342621, 4.283884,
2.204823, -4.304508, 4.162499,
4.985894, 4.802461, 3.751977,
1.592294, -1.257709, 5.456949,
2.644548, 4.524654, 4.921559,
2.760292, 5.100971, 5.015990,
3.523964, 8.005976, 3.729163,
5.599763, 5.715470, 2.724259,
3.063932, 6.566144, 4.529981,
5.720968, 4.254584, 2.830852,
6.374393, 4.785590, 1.591691,
0.672728, -3.688016, 5.737804,
1.262560, -3.787691, 5.417779,
1.732553, -3.952767, 5.000579,
1.043625, -1.464973, 5.662455,
2.321234, -4.329069, 4.258156,
2.056846, -4.477671, 4.520883,
2.153084, -4.276322, 4.038093,
0.946874, -1.035249, 6.512274,
1.469132, -4.036351, 4.604908,
1.024340, -3.989851, 4.926693,
0.533422, -3.993222, 5.138202,
0.769720, -6.095394, 4.985883,
0.699606, -5.291850, 5.448304,
0.669687, -4.949770, 5.509612,
0.630947, -4.695101, 5.449371,
0.583218, -4.517982, 5.339869,
1.537170, -4.423206, 4.745470,
1.615600, -4.475942, 4.813632,
1.729053, -4.618680, 4.854463,
1.838624, -4.828746, 4.823737,
2.368250, -3.106237, 4.868096,
7.542244, -1.049282, -2.431321,
1.826614, -4.399531, 4.399021,
1.929558, -4.411831, 4.497052,
0.597442, -2.013686, 5.866456,
1.405627, -1.714196, 5.241087,
0.662449, -1.819321, 5.863759,
2.342340, 0.572222, 4.294303,
3.327324, 0.104863, 4.113860,
1.726175, -0.919165, 5.273355,
5.133204, 7.485602, 2.660442,
4.538641, 6.319907, 3.683424,
3.986562, 5.109487, 4.466315,
2.169681, -5.440433, 4.455874,
1.395634, 5.011963, 5.316032,
1.619500, 6.599217, 4.921106,
1.891399, 8.236377, 4.274997,
4.195832, 2.235205, 3.375099,
5.733342, 1.411738, 2.431726,
1.859887, 2.355757, 3.843181,
4.988612, 3.074654, 3.083858,
1.303263, 1.416453, 4.831091,
1.305757, -0.672779, 6.415959,
6.465170, 0.937119, 1.689873,
5.258659, 0.945811, 2.974312,
4.432338, 0.722096, 3.522615,
3.300681, 0.861641, 3.872784,
2.430178, 1.131492, 4.039035,
1.820731, 1.467954, 4.224124,
0.563221, 2.307693, 5.566789,
6.338145, -0.529279, 1.881175,
5.587698, 3.208071, 2.687839,
0.242624, -1.462857, 7.071491,
1.611251, 0.339326, 4.895421,
7.743095, 2.364999, -2.005167,
1.391142, 1.851048, 4.448999,
1.785794, -0.978284, 4.850470,
4.670959, 2.664461, 3.084075,
1.333970, -0.283761, 6.097047,
7.270895, -2.890917, -2.252455,
1.856432, 2.585245, 3.757904,
0.923388, 0.073076, 6.671944,
5.000589, -6.135128, 1.892523,
5.085276, -7.178590, 0.714711,
7.159291, -0.811820, -0.072044,
5.843051, -5.248023, 0.924091,
6.847258, 3.662916, 0.724695,
2.412942, -8.258853, 4.119213,
0.179909, -1.689864, 6.573301,
2.103655, -0.163946, 4.566119,
6.407571, 2.236021, 1.560843,
3.670075, 2.360153, 3.635230,
3.177186, 2.294265, 3.775704,
2.196121, -4.598322, 4.479786,
6.234883, -1.944430, 1.663542,
1.292924, -9.295920, 4.094063,
3.210651, -8.533278, 2.802001,
4.068926, -7.993109, 1.925119,
2.724032, 2.315802, 3.777151,
2.288460, 2.398891, 3.697603,
1.998311, 2.496547, 3.689148,
6.130040, 3.399261, 2.038516,
2.288460, 2.886504, 3.775031,
2.724032, 2.961810, 3.871767,
3.177186, 2.964136, 3.876973,
3.670075, 2.927714, 3.724325,
4.018389, 2.857357, 3.482983,
7.555811, 4.106811, -0.991917,
4.018389, 2.483695, 3.440898,
1.776217, -2.683946, 5.213116,
1.222237, -1.182444, 5.952465,
0.731493, -2.536683, 5.815343,
4.135272, -6.996638, 2.671970,
3.311811, -7.660815, 3.382963,
1.313701, -8.639995, 4.702456,
5.940524, -6.223629, -0.631468,
1.998311, 2.743838, 3.744030,
0.901447, 1.236992, 5.754256,
2.308977, -8.974196, 3.609070,
6.954154, -2.439843, -0.131163,
1.098819, -4.458788, 5.120727,
1.181124, -4.579996, 5.189564,
1.255818, -4.787901, 5.237051,
1.325085, -5.106507, 5.205010,
1.546388, -5.819392, 4.757893,
1.953754, -4.183892, 4.431713,
2.117802, -4.137093, 4.555096,
2.285339, -4.051196, 4.582438,
2.850160, -3.665720, 4.484994,
5.278538, -2.238942, 2.861224,
0.946709, 1.907628, 5.196779,
1.314173, 3.104912, 4.231404,
1.780000, 2.860000, 3.881555,
1.845110, -4.098880, 4.247264,
5.436187, -4.030482, 2.109852,
0.766444, 3.182131, 4.861453,
1.938616, -6.614410, 4.521085,
0.516573, 1.583572, 6.148363,
1.246815, 0.230297, 5.681036,
0.997827, -6.930921, 4.979576,
3.288807, -5.382514, 3.795752,
2.311631, -1.566237, 4.590085,
2.680250, -6.111567, 4.096152,
3.832928, -1.537326, 4.137731,
2.961860, -2.274215, 4.440943,
4.386901, -2.683286, 3.643886,
1.217295, -7.834465, 4.969286,
1.542374, -0.136843, 5.201008,
3.878377, -6.041764, 3.311079,
3.084037, -6.809842, 3.814195,
3.747321, -4.503545, 3.726453,
6.094129, -3.205991, 1.473482,
4.588995, -4.728726, 2.983221,
6.583231, -3.941269, 0.070268,
3.492580, -3.195820, 4.130198,
1.255543, 0.802341, 5.307551,
1.126122, -0.933602, 6.538785,
1.443109, -1.142774, 5.905127,
0.923043, -0.529042, 7.003423,
1.755386, 3.529117, 4.327696,
2.632589, 3.713828, 4.364629,
3.388062, 3.721976, 4.309028,
4.075766, 3.675413, 4.076063,
4.622910, 3.474691, 3.646321,
5.171755, 2.535753, 2.670867,
7.297331, 0.763172, -0.048769,
4.706828, 1.651000, 3.109532,
4.071712, 1.476821, 3.476944,
3.269817, 1.470659, 3.731945,
2.527572, 1.617311, 3.865444,
1.970894, 1.858505, 3.961782,
1.579543, 2.097941, 4.084996,
7.664182, 0.673132, -2.435867,
1.397041, -1.340139, 5.630378,
0.884838, 0.658740, 6.233232,
0.767097, -0.968035, 7.077932,
0.460213, -1.334106, 6.787447,
0.748618, -1.067994, 6.798303,
1.236408, -1.585568, 5.480490,
0.387306, -1.409990, 6.957705,
0.319925, -1.607931, 6.508676,
1.639633, 2.556298, 3.863736,
1.255645, 2.467144, 4.203800,
1.031362, 2.382663, 4.615849,
4.253081, 2.772296, 3.315305,
4.530000, 2.910000, 3.339685];
const faces=[
174, 156, 134,
247, 34, 8,
383, 399, 363,
264, 467, 250,
309, 416, 325,
79, 96, 192,
357, 390, 265,
128, 35, 163,
369, 265, 390,
140, 163, 35,
268, 1, 303,
38, 73, 1,
12, 303, 1,
12, 1, 73,
350, 452, 351,
121, 122, 232,
453, 351, 452,
233, 232, 122,
268, 303, 270,
38, 40, 73,
304, 270, 303,
74, 73, 40,
358, 344, 351,
129, 122, 115,
278, 351, 344,
48, 115, 122,
351, 453, 358,
122, 129, 233,
454, 358, 453,
234, 233, 129,
300, 334, 298,
70, 68, 105,
333, 298, 334,
104, 105, 68,
176, 153, 397,
176, 172, 153,
378, 397, 153,
149, 153, 172,
382, 385, 383,
155, 156, 158,
399, 383, 385,
174, 158, 156,
281, 348, 331,
51, 102, 119,
349, 331, 348,
120, 119, 102,
270, 304, 271,
40, 41, 74,
305, 271, 304,
75, 74, 41,
10, 337, 152,
10, 152, 108,
338, 152, 337,
109, 108, 152,
345, 279, 361,
116, 132, 49,
280, 361, 279,
50, 49, 132,
263, 432, 419,
33, 195, 212,
425, 419, 432,
205, 212, 195,
305, 409, 271,
75, 41, 185,
410, 271, 409,
186, 185, 41,
273, 311, 408,
43, 184, 81,
416, 408, 311,
192, 81, 184,
323, 271, 411,
93, 187, 41,
410, 411, 271,
186, 41, 187,
348, 450, 349,
119, 120, 230,
451, 349, 450,
231, 230, 120,
435, 433, 431,
215, 211, 213,
423, 431, 433,
203, 213, 211,
314, 315, 19,
84, 19, 85,
18, 19, 315,
18, 85, 19,
308, 376, 307,
78, 77, 147,
292, 307, 376,
62, 147, 77,
260, 388, 261,
30, 31, 161,
389, 261, 388,
162, 161, 31,
287, 415, 385,
57, 158, 191,
399, 385, 415,
174, 191, 158,
419, 425, 407,
195, 183, 205,
336, 407, 425,
107, 205, 183,
368, 417, 365,
139, 136, 193,
435, 365, 417,
215, 193, 136,
392, 424, 328,
166, 99, 204,
359, 328, 424,
130, 204, 99,
299, 302, 285,
69, 55, 72,
252, 285, 302,
22, 72, 55,
5, 276, 6,
5, 6, 46,
282, 6, 276,
52, 46, 6,
255, 374, 254,
25, 24, 145,
375, 254, 374,
146, 145, 24,
321, 322, 308,
91, 78, 92,
376, 308, 322,
147, 92, 78,
281, 426, 412,
51, 188, 206,
428, 412, 426,
208, 206, 188,
422, 314, 201,
202, 201, 84,
19, 201, 314,
19, 84, 201,
336, 322, 407,
107, 183, 92,
406, 407, 322,
182, 92, 183,
406, 322, 405,
182, 181, 92,
321, 405, 322,
91, 92, 181,
18, 315, 17,
18, 17, 85,
316, 17, 315,
86, 85, 17,
426, 267, 427,
206, 207, 37,
424, 427, 267,
204, 37, 207,
370, 397, 401,
141, 177, 172,
378, 401, 397,
149, 172, 177,
392, 270, 323,
166, 93, 40,
271, 323, 270,
41, 40, 93,
418, 466, 414,
194, 190, 246,
465, 414, 466,
245, 246, 190,
258, 259, 387,
28, 160, 29,
386, 387, 259,
159, 29, 160,
261, 389, 468,
31, 248, 162,
467, 468, 389,
247, 162, 248,
249, 457, 420,
4, 197, 237,
400, 420, 457,
175, 237, 197,
334, 299, 333,
105, 104, 69,
285, 333, 299,
55, 69, 104,
286, 9, 418,
56, 194, 9,
169, 418, 9,
169, 9, 194,
341, 262, 347,
112, 118, 32,
449, 347, 262,
229, 32, 118,
286, 418, 442,
56, 222, 194,
414, 442, 418,
190, 194, 222,
328, 461, 327,
99, 98, 241,
329, 327, 461,
100, 241, 98,
278, 356, 330,
48, 101, 127,
372, 330, 356,
143, 127, 101,
310, 393, 439,
80, 219, 167,
440, 439, 393,
220, 167, 219,
382, 383, 257,
155, 27, 156,
342, 257, 383,
113, 156, 27,
361, 280, 421,
132, 199, 50,
430, 421, 280,
210, 50, 199,
366, 365, 380,
137, 151, 136,
395, 380, 365,
170, 136, 151,
356, 278, 438,
127, 218, 48,
344, 438, 278,
115, 48, 218,
444, 445, 283,
224, 53, 225,
284, 283, 445,
54, 225, 53,
282, 276, 364,
52, 135, 46,
441, 364, 276,
221, 46, 135,
432, 263, 396,
212, 171, 33,
370, 396, 263,
141, 33, 171,
338, 300, 339,
109, 110, 70,
298, 339, 300,
68, 70, 110,
336, 274, 322,
107, 92, 44,
376, 322, 274,
147, 44, 92,
349, 451, 350,
120, 121, 231,
452, 350, 451,
232, 231, 121,
468, 360, 343,
248, 114, 131,
447, 343, 360,
227, 131, 114,
283, 284, 335,
53, 106, 54,
294, 335, 284,
64, 54, 106,
251, 459, 463,
21, 243, 239,
462, 463, 459,
242, 239, 243,
277, 354, 301,
47, 71, 125,
384, 301, 354,
157, 125, 71,
326, 293, 325,
97, 96, 63,
309, 325, 293,
79, 63, 96,
284, 277, 294,
54, 64, 47,
301, 294, 277,
71, 47, 64,
448, 265, 346,
228, 117, 35,
373, 346, 265,
144, 35, 117,
353, 346, 347,
124, 118, 117,
341, 347, 346,
112, 117, 118,
2, 20, 275,
2, 45, 20,
355, 275, 20,
126, 20, 45,
249, 282, 457,
4, 237, 52,
364, 457, 282,
135, 52, 237,
426, 427, 428,
206, 208, 207,
437, 428, 427,
217, 207, 208,
381, 382, 253,
154, 23, 155,
257, 253, 382,
27, 155, 23,
392, 394, 270,
166, 40, 168,
268, 270, 394,
38, 168, 40,
200, 429, 201,
200, 201, 209,
422, 201, 429,
202, 209, 201,
331, 330, 267,
102, 37, 101,
372, 267, 330,
143, 101, 37,
423, 433, 274,
203, 44, 213,
288, 274, 433,
58, 213, 44,
291, 251, 329,
61, 100, 21,
463, 329, 251,
243, 21, 100,
259, 287, 386,
29, 159, 57,
385, 386, 287,
158, 57, 159,
343, 447, 354,
114, 125, 227,
266, 354, 447,
36, 227, 125,
258, 387, 260,
28, 30, 160,
388, 260, 387,
161, 160, 30,
431, 423, 432,
211, 212, 203,
425, 432, 423,
205, 203, 212,
446, 343, 277,
226, 47, 114,
354, 277, 343,
125, 114, 47,
425, 423, 336,
205, 107, 203,
274, 336, 423,
44, 203, 107,
307, 293, 308,
77, 78, 63,
326, 308, 293,
97, 63, 78,
367, 448, 353,
138, 124, 228,
346, 353, 448,
117, 228, 124,
303, 269, 304,
73, 74, 39,
272, 304, 269,
42, 39, 74,
372, 359, 267,
143, 37, 130,
424, 267, 359,
204, 130, 37,
328, 295, 461,
99, 241, 65,
456, 461, 295,
236, 65, 241,
295, 332, 279,
65, 49, 103,
280, 279, 332,
50, 103, 49,
304, 272, 305,
74, 75, 42,
273, 305, 272,
43, 42, 75,
428, 437, 435,
208, 215, 217,
433, 435, 437,
213, 217, 215,
305, 273, 409,
75, 185, 43,
408, 409, 273,
184, 43, 185,
395, 431, 396,
170, 171, 211,
432, 396, 431,
212, 211, 171,
396, 370, 379,
171, 150, 141,
401, 379, 370,
177, 141, 150,
297, 335, 300,
67, 70, 106,
334, 300, 335,
105, 106, 70,
418, 169, 352,
194, 123, 169,
7, 352, 169,
7, 169, 123,
281, 412, 353,
51, 124, 188,
377, 353, 412,
148, 188, 124,
320, 321, 326,
90, 97, 91,
308, 326, 321,
78, 91, 97,
286, 296, 337,
56, 108, 66,
297, 337, 296,
67, 66, 108,
405, 321, 404,
181, 180, 91,
320, 404, 321,
90, 91, 180,
331, 349, 330,
102, 101, 120,
350, 330, 349,
121, 120, 101,
335, 294, 334,
106, 105, 64,
299, 334, 294,
69, 64, 105,
324, 455, 367,
94, 138, 235,
448, 367, 455,
228, 235, 138,
17, 316, 16,
17, 16, 86,
317, 16, 316,
87, 86, 16,
430, 280, 359,
210, 130, 50,
332, 359, 280,
103, 50, 130,
16, 317, 15,
16, 15, 87,
318, 15, 317,
88, 87, 15,
9, 286, 10,
9, 10, 56,
337, 10, 286,
108, 56, 10,
330, 350, 278,
101, 48, 121,
351, 278, 350,
122, 121, 48,
253, 254, 381,
23, 154, 24,
375, 381, 254,
146, 24, 154,
403, 404, 319,
179, 89, 180,
320, 319, 404,
90, 180, 89,
352, 7, 420,
123, 197, 7,
198, 420, 7,
198, 7, 197,
325, 319, 326,
96, 97, 89,
320, 326, 319,
90, 89, 97,
398, 368, 366,
173, 137, 139,
365, 366, 368,
136, 139, 137,
289, 436, 398,
59, 173, 216,
368, 398, 436,
139, 216, 173,
439, 440, 345,
219, 116, 220,
279, 345, 440,
49, 220, 116,
272, 312, 273,
42, 43, 82,
311, 273, 312,
81, 82, 43,
6, 282, 196,
6, 196, 52,
249, 196, 282,
4, 52, 196,
274, 288, 376,
44, 147, 58,
292, 376, 288,
62, 58, 147,
397, 429, 176,
172, 176, 209,
200, 176, 429,
200, 209, 176,
269, 313, 272,
39, 42, 83,
312, 272, 313,
82, 83, 42,
445, 446, 284,
225, 54, 226,
277, 284, 446,
47, 226, 54,
255, 340, 374,
25, 145, 111,
391, 374, 340,
164, 111, 145,
296, 283, 297,
66, 67, 53,
335, 297, 283,
106, 53, 67,
347, 449, 348,
118, 119, 229,
450, 348, 449,
230, 229, 119,
455, 357, 448,
235, 228, 128,
265, 448, 357,
35, 128, 228,
337, 297, 338,
108, 109, 67,
300, 338, 297,
70, 67, 109,
152, 338, 11,
152, 11, 109,
339, 11, 338,
110, 109, 11,
279, 440, 295,
49, 65, 220,
456, 295, 440,
236, 220, 65,
408, 416, 293,
184, 63, 192,
309, 293, 416,
79, 192, 63,
359, 372, 430,
130, 210, 143,
356, 430, 372,
127, 143, 210,
346, 373, 341,
117, 112, 144,
266, 341, 373,
36, 144, 112,
389, 391, 467,
162, 247, 164,
250, 467, 391,
8, 164, 247,
353, 347, 281,
124, 51, 118,
348, 281, 347,
119, 118, 51,
296, 443, 283,
66, 53, 223,
444, 283, 443,
224, 223, 53,
20, 95, 355,
20, 126, 95,
371, 355, 95,
142, 95, 126,
296, 286, 443,
66, 223, 56,
442, 443, 286,
222, 56, 223,
420, 198, 249,
197, 4, 198,
196, 249, 198,
196, 198, 4,
360, 264, 256,
131, 26, 34,
250, 256, 264,
8, 34, 26,
276, 275, 441,
46, 221, 45,
458, 441, 275,
238, 45, 221,
301, 384, 302,
71, 72, 157,
369, 302, 384,
140, 157, 72,
418, 352, 466,
194, 246, 123,
413, 466, 352,
189, 123, 246,
467, 264, 468,
247, 248, 34,
360, 468, 264,
131, 34, 248,
390, 252, 369,
163, 140, 22,
302, 369, 252,
72, 22, 140,
375, 387, 381,
146, 154, 160,
386, 381, 387,
159, 160, 154,
380, 395, 379,
151, 150, 170,
396, 379, 395,
171, 170, 150,
352, 420, 413,
123, 189, 197,
400, 413, 420,
175, 197, 189,
427, 323, 437,
207, 217, 93,
411, 437, 323,
187, 93, 217,
388, 374, 389,
161, 162, 145,
391, 389, 374,
164, 145, 162,
394, 327, 165,
168, 165, 98,
3, 165, 327,
3, 98, 165,
355, 371, 462,
126, 242, 142,
463, 462, 371,
243, 142, 242,
1, 268, 165,
1, 165, 38,
394, 165, 268,
168, 38, 165,
12, 13, 303,
12, 73, 13,
269, 303, 13,
39, 13, 73,
387, 375, 388,
160, 161, 146,
374, 388, 375,
145, 146, 161,
13, 14, 269,
13, 39, 14,
313, 269, 14,
83, 14, 39,
294, 301, 299,
64, 69, 71,
302, 299, 301,
72, 71, 69,
341, 266, 262,
112, 32, 36,
447, 262, 266,
227, 36, 32,
381, 386, 382,
154, 155, 159,
385, 382, 386,
158, 159, 155,
281, 331, 426,
51, 206, 102,
267, 426, 331,
37, 102, 206,
424, 392, 427,
204, 207, 166,
323, 427, 392,
93, 166, 207,
430, 356, 421,
210, 199, 127,
438, 421, 356,
218, 127, 199,
392, 328, 394,
166, 168, 99,
327, 394, 328,
98, 99, 168,
458, 439, 441,
238, 221, 219,
345, 441, 439,
116, 219, 221,
383, 363, 342,
156, 113, 134,
464, 342, 363,
244, 134, 113,
458, 462, 460,
238, 240, 242,
459, 460, 462,
239, 242, 240,
435, 431, 365,
215, 136, 211,
395, 365, 431,
170, 211, 136,
415, 464, 399,
191, 174, 244,
363, 399, 464,
134, 244, 174,
263, 429, 370,
33, 141, 209,
397, 370, 429,
172, 209, 141,
458, 275, 462,
238, 242, 45,
355, 462, 275,
126, 45, 242,
317, 404, 318,
87, 88, 180,
403, 318, 404,
179, 180, 88,
316, 405, 317,
86, 87, 181,
404, 317, 405,
180, 181, 87,
315, 406, 316,
85, 86, 182,
405, 316, 406,
181, 182, 86,
314, 407, 315,
84, 85, 183,
406, 315, 407,
182, 183, 85,
419, 407, 422,
195, 202, 183,
314, 422, 407,
84, 183, 202,
367, 402, 324,
138, 94, 178,
362, 324, 402,
133, 178, 94,
409, 408, 307,
185, 77, 184,
293, 307, 408,
63, 184, 77,
409, 307, 410,
185, 186, 77,
292, 410, 307,
62, 77, 186,
411, 410, 288,
187, 58, 186,
292, 288, 410,
62, 186, 58,
437, 411, 433,
217, 213, 187,
288, 433, 411,
58, 187, 213,
435, 417, 428,
215, 208, 193,
412, 428, 417,
188, 193, 208,
265, 369, 373,
35, 144, 140,
384, 373, 369,
157, 140, 144,
458, 460, 439,
238, 219, 240,
310, 439, 460,
80, 240, 219,
353, 377, 367,
124, 138, 148,
402, 367, 377,
178, 148, 138,
5, 2, 276,
5, 46, 2,
275, 276, 2,
45, 2, 46,
429, 263, 422,
209, 202, 33,
419, 422, 263,
195, 33, 202,
328, 359, 295,
99, 65, 130,
332, 295, 359,
103, 130, 65,
368, 436, 417,
139, 193, 216,
434, 417, 436,
214, 216, 193,
456, 440, 290,
236, 60, 220,
393, 290, 440,
167, 220, 60,
329, 463, 327,
100, 98, 243,
371, 327, 463,
142, 243, 98,
327, 371, 3,
98, 3, 142,
95, 3, 371,
95, 142, 3,
461, 456, 306,
241, 76, 236,
290, 306, 456,
60, 236, 76,
449, 340, 450,
229, 230, 111,
255, 450, 340,
25, 111, 230,
262, 447, 256,
32, 26, 227,
360, 256, 447,
131, 227, 26,
450, 255, 451,
230, 231, 25,
254, 451, 255,
24, 25, 231,
451, 254, 452,
231, 232, 24,
253, 452, 254,
23, 24, 232,
452, 253, 453,
232, 233, 23,
257, 453, 253,
27, 23, 233,
257, 342, 453,
27, 233, 113,
454, 453, 342,
234, 113, 233,
414, 465, 415,
190, 191, 245,
464, 415, 465,
244, 245, 191,
442, 414, 287,
222, 57, 190,
415, 287, 414,
191, 190, 57,
442, 287, 443,
222, 223, 57,
259, 443, 287,
29, 57, 223,
443, 259, 444,
223, 224, 29,
258, 444, 259,
28, 29, 224,
445, 444, 260,
225, 30, 224,
258, 260, 444,
28, 224, 30,
260, 261, 445,
30, 225, 31,
446, 445, 261,
226, 31, 225,
261, 468, 446,
31, 226, 248,
343, 446, 468,
114, 248, 226,
251, 310, 459,
21, 239, 80,
460, 459, 310,
240, 80, 239,
291, 306, 393,
61, 167, 76,
290, 393, 306,
60, 76, 167,
461, 306, 329,
241, 100, 76,
291, 329, 306,
61, 76, 100,
377, 434, 402,
148, 178, 214,
436, 402, 434,
216, 214, 178,
251, 291, 310,
21, 80, 61,
393, 310, 291,
167, 61, 80,
412, 417, 377,
188, 148, 193,
434, 377, 417,
214, 193, 148,
342, 464, 454,
113, 234, 244,
465, 454, 464,
245, 244, 234,
454, 465, 358,
234, 129, 245,
466, 358, 465,
246, 245, 129,
413, 344, 466,
189, 246, 115,
358, 466, 344,
129, 115, 246,
438, 344, 400,
218, 175, 115,
413, 400, 344,
189, 115, 175,
364, 441, 361,
135, 132, 221,
345, 361, 441,
116, 221, 132,
457, 421, 400,
237, 175, 199,
438, 400, 421,
218, 199, 175,
457, 364, 421,
237, 199, 135,
361, 421, 364,
132, 135, 199,
362, 402, 289,
133, 59, 178,
436, 289, 402,
216, 178, 59,
354, 266, 384,
125, 157, 36,
373, 384, 266,
144, 36, 157,
256, 250, 340,
26, 111, 8,
391, 340, 250,
164, 8, 111,
262, 256, 449,
32, 229, 26,
340, 449, 256,
111, 26, 229,
15, 318, 14,
15, 14, 88,
313, 14, 318,
83, 88, 14,
318, 403, 313,
88, 83, 179,
312, 313, 403,
82, 179, 83,
403, 319, 312,
179, 82, 89,
311, 312, 319,
81, 89, 82,
319, 325, 311,
89, 81, 96,
416, 311, 325,
192, 96, 81   ];

let tc=[0.499977,0.652534,0.500026,0.5474870000000001,0.499974,0.602372,0.482113,0.47197900000000004,0.500151,0.527156,0.49991,0.49825299999999995,0.499523,0.40106200000000003,0.289712,0.380764,0.499955,0.31239799999999995,0.499987,0.269919,0.500023,0.10704999999999998,0.500023,0.666234,0.500016,0.679224,0.500023,0.692348,0.499977,0.6952780000000001,0.499977,0.7059340000000001,0.499977,0.7193849999999999,0.499977,0.737019,0.499968,0.781371,0.499816,0.562981,0.473773,0.5739099999999999,0.104907,0.25414099999999995,0.36593,0.40957600000000005,0.338758,0.413025,0.31112,0.40946000000000005,0.274658,0.389131,0.393362,0.403706,0.345234,0.34401099999999996,0.370094,0.34607600000000005,0.319322,0.34726500000000005,0.297903,0.353591,0.247792,0.41081,0.396889,0.842755,0.280098,0.37560000000000004,0.10631,0.399956,0.209925,0.39135299999999995,0.355808,0.5344059999999999,0.471751,0.650404,0.474155,0.680192,0.439785,0.6572290000000001,0.414617,0.666541,0.450374,0.6808609999999999,0.428771,0.6826909999999999,0.374971,0.727805,0.486717,0.5476289999999999,0.485301,0.5273950000000001,0.257765,0.31449000000000005,0.401223,0.455172,0.429819,0.5486150000000001,0.421352,0.533741,0.276896,0.532057,0.48337,0.499587,0.337212,0.282883,0.296392,0.29324300000000003,0.169295,0.19381400000000004,0.44758,0.30261000000000005,0.39239,0.353888,0.35449,0.6967840000000001,0.067305,0.730105,0.442739,0.5728260000000001,0.457098,0.584792,0.381974,0.6947110000000001,0.392389,0.694203,0.277076,0.27193199999999995,0.422552,0.563233,0.385919,0.28136399999999995,0.383103,0.25583999999999996,0.331431,0.11971399999999999,0.229924,0.23200299999999996,0.364501,0.189114,0.229622,0.29954099999999995,0.173287,0.278748,0.472879,0.6661980000000001,0.446828,0.668527,0.422762,0.67389,0.445308,0.580066,0.388103,0.693961,0.403039,0.70654,0.403629,0.693953,0.460042,0.557139,0.431158,0.692366,0.452182,0.692366,0.475387,0.692366,0.465828,0.77919,0.472329,0.736226,0.473087,0.717857,0.473122,0.704626,0.473033,0.6952780000000001,0.427942,0.6952780000000001,0.426479,0.70354,0.423162,0.711846,0.418309,0.720063,0.390095,0.639573,0.013954,0.5600339999999999,0.499914,0.580147,0.4132,0.6954,0.409626,0.701823,0.46808,0.6015349999999999,0.422729,0.585985,0.46308,0.593784,0.37212,0.473414,0.334562,0.496073,0.411671,0.5469649999999999,0.242176,0.14767600000000003,0.290777,0.20144600000000001,0.327338,0.25652699999999995,0.39951,0.748921,0.441728,0.261676,0.429765,0.18783399999999995,0.412198,0.10890100000000003,0.288955,0.398952,0.218937,0.435411,0.412782,0.39897000000000005,0.257135,0.35544,0.427685,0.43796100000000004,0.44834,0.5369360000000001,0.17856,0.457554,0.247308,0.457194,0.286267,0.46767499999999995,0.332828,0.460712,0.368756,0.447207,0.398964,0.432655,0.47641,0.405806,0.189241,0.5239240000000001,0.228962,0.348951,0.490726,0.5624009999999999,0.40467,0.48513300000000004,0.019469,0.40156400000000003,0.426243,0.420431,0.396993,0.548797,0.26647,0.376977,0.439121,0.518958,0.032314,0.6443570000000001,0.419054,0.387155,0.462783,0.505747,0.238979,0.779745,0.198221,0.8319380000000001,0.10755,0.540755,0.18361,0.7402569999999999,0.13441,0.33368299999999995,0.385764,0.883154,0.490967,0.579378,0.382385,0.5085729999999999,0.174399,0.397671,0.318785,0.396235,0.343364,0.400597,0.3961,0.710217,0.187885,0.588538,0.430987,0.944065,0.318993,0.898285,0.266248,0.8697010000000001,0.500023,0.19057599999999997,0.499977,0.954453,0.36617,0.398822,0.393207,0.395537,0.410373,0.39108,0.194993,0.342102,0.388665,0.36228400000000005,0.365962,0.35597100000000004,0.343364,0.35535700000000003,0.318785,0.35834,0.301415,0.36315600000000003,0.058133,0.319076,0.301415,0.38744900000000004,0.499988,0.6184339999999999,0.415838,0.624196,0.445682,0.5660769999999999,0.465844,0.620641,0.499923,0.35152399999999995,0.288719,0.8199460000000001,0.335279,0.85282,0.440512,0.902419,0.128294,0.791941,0.408772,0.37389399999999995,0.455607,0.451801,0.499877,0.90899,0.375437,0.924192,0.11421,0.615022,0.448662,0.6952780000000001,0.44802,0.7046319999999999,0.447112,0.715808,0.444832,0.7307939999999999,0.430012,0.766809,0.406787,0.685673,0.400738,0.6810689999999999,0.3924,0.6777029999999999,0.367856,0.6639189999999999,0.247923,0.601333,0.45277,0.42084999999999995,0.436392,0.35988699999999996,0.416164,0.368714,0.413386,0.692366,0.228018,0.6835720000000001,0.468268,0.35267099999999996,0.411362,0.804327,0.499989,0.46982500000000005,0.479154,0.442654,0.499974,0.43963699999999994,0.432112,0.49358900000000006,0.499886,0.8669169999999999,0.499913,0.8217289999999999,0.456549,0.8192010000000001,0.344549,0.745439,0.378909,0.57401,0.374293,0.780185,0.319688,0.570738,0.357155,0.60427,0.295284,0.6215809999999999,0.44775,0.8624769999999999,0.410986,0.508723,0.313951,0.775308,0.354128,0.812553,0.324548,0.703993,0.189096,0.6463,0.279777,0.714658,0.133823,0.682701,0.336768,0.644733,0.429884,0.466522,0.455528,0.5486230000000001,0.437114,0.5588960000000001,0.467288,0.529925,0.414712,0.33521999999999996,0.377046,0.322778,0.344108,0.32015099999999996,0.312876,0.32233199999999995,0.283526,0.33319,0.241246,0.38278599999999996,0.102986,0.46876300000000004,0.267612,0.42456000000000005,0.297879,0.433176,0.333434,0.433878,0.366427,0.42611600000000005,0.396012,0.41669599999999996,0.420121,0.41022800000000004,0.007561,0.480777,0.432949,0.569518,0.458639,0.479089,0.473466,0.545744,0.476088,0.56383,0.468472,0.555057,0.433991,0.582362,0.483518,0.5629839999999999,0.482483,0.5778490000000001,0.42645,0.389799,0.438999,0.39649500000000004,0.450067,0.40043399999999996,0.289712,0.36825300000000005,0.27667,0.36337299999999995,0.517862,0.47194800000000003,0.710288,0.380764,0.526227,0.5739099999999999,0.895093,0.25414099999999995,0.63407,0.40957600000000005,0.661242,0.413025,0.68888,0.40946000000000005,0.725342,0.389131,0.60663,0.403705,0.654766,0.34401099999999996,0.629906,0.34607600000000005,0.680678,0.34726500000000005,0.702097,0.353591,0.752212,0.410805,0.602918,0.842863,0.719902,0.37560000000000004,0.893693,0.39996,0.790082,0.391354,0.643998,0.5344880000000001,0.528249,0.650404,0.52585,0.680191,0.560215,0.6572290000000001,0.585384,0.666541,0.549626,0.6808609999999999,0.571228,0.6826920000000001,0.624852,0.728099,0.51305,0.547282,0.515097,0.527252,0.742247,0.314507,0.598631,0.454979,0.570338,0.548575,0.578632,0.533623,0.723087,0.532054,0.516446,0.49963900000000006,0.662801,0.282918,0.703624,0.29327099999999995,0.830705,0.19381400000000004,0.552386,0.30256799999999995,0.60761,0.353888,0.645429,0.696707,0.932695,0.730105,0.557261,0.5728260000000001,0.542902,0.584792,0.618026,0.6947110000000001,0.607591,0.694203,0.722943,0.27196299999999995,0.577414,0.563167,0.614083,0.28138700000000005,0.616907,0.25588599999999995,0.668509,0.11991399999999997,0.770092,0.23202100000000003,0.635536,0.189249,0.770391,0.29955600000000004,0.826722,0.278755,0.527121,0.6661980000000001,0.553172,0.668527,0.577238,0.67389,0.554692,0.580066,0.611897,0.693961,0.596961,0.70654,0.596371,0.693953,0.539958,0.557139,0.568842,0.692366,0.547818,0.692366,0.524613,0.692366,0.53409,0.779141,0.527671,0.736226,0.526913,0.717857,0.526878,0.704626,0.526967,0.6952780000000001,0.572058,0.6952780000000001,0.573521,0.70354,0.576838,0.711846,0.581691,0.720063,0.609945,0.63991,0.986046,0.5600339999999999,0.5868,0.6954,0.590372,0.701823,0.531915,0.601537,0.577268,0.585935,0.536915,0.5937859999999999,0.627543,0.473352,0.665586,0.49595100000000003,0.588354,0.546862,0.757824,0.14767600000000003,0.70925,0.20150800000000002,0.672684,0.25658099999999995,0.600409,0.7490049999999999,0.558266,0.261672,0.570304,0.187871,0.588166,0.10904400000000003,0.711045,0.398952,0.78107,0.43540500000000004,0.587247,0.39893199999999995,0.74287,0.35544600000000004,0.572156,0.43765200000000004,0.551868,0.53657,0.821442,0.45755599999999996,0.752702,0.457182,0.713757,0.467627,0.667113,0.460673,0.631101,0.44715400000000005,0.600862,0.432473,0.523481,0.40562699999999996,0.810748,0.523926,0.771046,0.348959,0.509127,0.562718,0.595293,0.485024,0.980531,0.40156400000000003,0.5735,0.42000000000000004,0.602995,0.5486880000000001,0.73353,0.376977,0.560611,0.5190170000000001,0.967686,0.6443570000000001,0.580985,0.38715999999999995,0.537728,0.505385,0.760966,0.779753,0.801779,0.8319380000000001,0.892441,0.540761,0.816351,0.7402599999999999,0.865595,0.33368699999999996,0.614074,0.883246,0.508953,0.579438,0.617942,0.508316,0.825608,0.397675,0.681215,0.396235,0.656636,0.400597,0.6039,0.710217,0.812086,0.5885389999999999,0.568013,0.944565,0.681008,0.898285,0.733752,0.8697010000000001,0.63383,0.398822,0.606793,0.395537,0.58966,0.391062,0.805016,0.34210799999999997,0.611335,0.36228400000000005,0.634038,0.35597100000000004,0.656636,0.35535700000000003,0.681215,0.35834,0.698585,0.36315600000000003,0.941867,0.319076,0.698585,0.38744900000000004,0.584177,0.624107,0.554318,0.5660769999999999,0.534154,0.6206400000000001,0.711218,0.819975,0.66463,0.8528709999999999,0.5591,0.902632,0.871706,0.791941,0.591234,0.37389399999999995,0.544341,0.451584,0.624563,0.924192,0.88577,0.615029,0.551338,0.6952780000000001,0.55198,0.7046319999999999,0.552888,0.715808,0.555168,0.7307939999999999,0.569944,0.767035,0.593203,0.685676,0.599262,0.6810689999999999,0.6076,0.6777029999999999,0.631938,0.6635,0.752033,0.601315,0.547226,0.42039499999999996,0.563544,0.35982800000000004,0.583841,0.368714,0.586614,0.692366,0.771915,0.683578,0.531597,0.352483,0.588371,0.804441,0.520797,0.442565,0.567985,0.493479,0.543283,0.8192550000000001,0.655317,0.7455149999999999,0.621009,0.5740179999999999,0.62556,0.780312,0.680198,0.570719,0.642764,0.604338,0.704663,0.62153,0.552012,0.862592,0.589072,0.508637,0.685945,0.775357,0.645735,0.81264,0.675343,0.703978,0.810858,0.646305,0.720122,0.7146669999999999,0.866152,0.682705,0.663187,0.644597,0.570082,0.466326,0.544562,0.548376,0.562759,0.558785,0.531987,0.5301400000000001,0.585271,0.33517699999999995,0.622953,0.32277900000000004,0.655896,0.320163,0.687132,0.322346,0.716482,0.33320099999999997,0.758757,0.382787,0.897013,0.468769,0.732392,0.424547,0.702114,0.43316299999999996,0.666525,0.433866,0.633505,0.426088,0.603876,0.41658700000000004,0.579658,0.409945,0.99244,0.480777,0.567192,0.56942,0.541366,0.47889899999999996,0.526564,0.546118,0.523913,0.56383,0.531529,0.555057,0.566036,0.582329,0.516311,0.5630539999999999,0.517472,0.577877,0.573595,0.389807,0.560698,0.395332,0.549756,0.39975099999999997,0.710288,0.36825300000000005,0.72333,0.36337299999999995];


for(let i=0;i<faces.length;i++)
{

    // if(faces[i]>467)
    {
        faces[i]--;
        // console.log("oops",i,faces[i]);
    }
}

console.log("verts",verts.length,verts.length/3);



const geom=new CGL.Geometry("fratze");
    geom.clear();

geom.vertices=new Float32Array(verts);
geom.texCoords=new Float32Array(tc);

geom.vertexNormals=new Float32Array(verts);
geom.verticesIndices=faces;

outGeom.set(null);
outGeom.set(geom);

const g=geom.copy();