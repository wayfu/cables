op.name="SoundCloud Resolve";

var clientId="6f693b837b47b59a17403e79bcff3626";

var soundCloudUrl=op.addInPort(new Port(op,"SoundCloud URL",OP_PORT_TYPE_VALUE,{type:"string"}));

var streamUrl=op.addOutPort(new Port(op,"Stream URL",OP_PORT_TYPE_VALUE));
var artworkUrl=op.addOutPort(new Port(op,"Artwork URL",OP_PORT_TYPE_VALUE));
var title=op.addOutPort(new Port(op,"Title",OP_PORT_TYPE_VALUE));
var result=op.addOutPort(new Port(op,"Result",OP_PORT_TYPE_OBJECT));

soundCloudUrl.onValueChanged=resolve;

function resolve()
{
    CABLES.ajax(
        'https://api.soundcloud.com/resolve.json?url='+soundCloudUrl.get()+'&client_id='+clientId,
        function(err,_data,xhr)
        {
            var data=JSON.parse(_data);
            streamUrl.set(data.stream_url+"?client_id="+clientId);
            artworkUrl.set(data.artwork_url);
            title.set(data.title);
            console.log('stream url:'+data.stream_url);
            console.log(data);
        });

}
