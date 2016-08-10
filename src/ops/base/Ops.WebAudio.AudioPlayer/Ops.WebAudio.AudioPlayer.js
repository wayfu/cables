var self = this;
var patch=this.patch;

this.name='AudioPlayer';

this.file=this.addInPort(new Port(this,"file",OP_PORT_TYPE_VALUE,{ display:'file',filter:'mp3' }));

var play=op.addInPort(new Port(this,"play",OP_PORT_TYPE_VALUE,{ display:'bool' }));
var autoPlay=op.addInPort(new Port(this,"Autoplay",OP_PORT_TYPE_VALUE,{ display:'bool' }));

this.volume=this.addInPort(new Port(this,"volume",OP_PORT_TYPE_VALUE,{ display:'range' }));
var synchronizedPlayer=this.addInPort(new Port(this,"Synchronized Player",OP_PORT_TYPE_VALUE,{ display:'bool' }));
this.volume.val=1.0;
this.audioOut=this.addOutPort(new Port(this, "audio out",OP_PORT_TYPE_OBJECT));
var outPlaying=this.addOutPort(new Port(this, "playing",OP_PORT_TYPE_VALUE));
var outEnded=this.addOutPort(new Port(this, "ended",OP_PORT_TYPE_FUNCTION));

autoPlay.set(true);

outPlaying.ignoreValueSerialize=true;
outEnded.ignoreValueSerialize=true;

window.AudioContext = window.AudioContext||window.webkitAudioContext;

if(!window.audioContext) {
    window.audioContext = new AudioContext();
}

if(!window.audioContext) {
    if(this.patch.config.onError) this.patch.config.onError('sorry, could not initialize WebAudio. Please check if your Browser supports WebAudio');
}

this.filter = audioContext.createGain();
self.audio=null;
var buffer=null;
var playing=false;
outPlaying.set(false);


play.onValueChanged=function()
{
    if(play.get())
    {
        playing=true;
        self.audio.play();
    }
    else
    {
        playing=false;
        self.audio.pause();
    }
    outPlaying.set(playing);
};

this.volume.onValueChanged = function()
{
    self.filter.gain.value=self.volume.get() || 0;
};

this.onDelete=function()
{
    if(self.audio) self.audio.pause();
};

function seek()
{
    // if(!window.gui && CGL.getLoadingStatus()>=1.0)
    // {
    //     console.log('seek canceled',CGL.getLoadingStatus());
    //     return;
    // }

    if(!synchronizedPlayer.get())
    {
        if(!self.audio)return;

        if(self.patch.timer.isPlaying() && self.audio.paused) self.audio.play();
            else if(!self.patch.timer.isPlaying() && !self.audio.paused) self.audio.pause();

        self.audio.currentTime=self.patch.timer.getTime();
    }
    else
    {
        if(buffer===null)return;

        var t=self.patch.timer.getTime();
        if(!isFinite(t))
        {
            return;
            // console.log('not finite time...',t);
            // t=0.0;
        }

        playing=false;

        // console.log('seek.....',self.patch.timer.isPlaying());

        if(self.patch.timer.isPlaying() )
        {
            console.log('play!');
            outPlaying.set(true);

            self.media.start(t);
            playing=true;
        }
    }

}

function playPause()
{
    if(!self.audio)return;
            
    if(self.patch.timer.isPlaying()) self.audio.play();
        else self.audio.pause();
}

var firstTime=true;
var loadingFilename='';
this.file.onValueChanged = function()
{
    if(!self.file.get())return;
    loadingFilename=self.file.get();
    var loadingId=patch.loading.start('audioplayer',self.file.get());


    if(!synchronizedPlayer.get())
    {
        if(self.audio)
        {
            self.audio.pause();
            outPlaying.set(false);
        }
        self.audio = new Audio();

console.log('load audio',self.file.val);

        self.audio.crossOrigin = "anonymous";
        self.audio.src = self.file.val;
        self.audio.crossOrigin = "anonymous";

        var canplaythrough=function()
        {
            if(autoPlay.get() || play.get()) self.audio.play();
            outPlaying.set(true);
            patch.loading.finished(loadingId);
            self.audio.removeEventListener('canplaythrough',canplaythrough, false);
        };

        self.audio.addEventListener('canplaythrough',canplaythrough, false);
        
        self.audio.addEventListener('ended',function()
        {
            console.log('audio player ended...');
            outPlaying.set(false);
            playing=false;
            outEnded.trigger();
        }, false);
        

        self.media = audioContext.createMediaElementSource(self.audio);
        self.media.connect(self.filter);
        self.audioOut.val = self.filter;

    }
    else
    {
        self.media = audioContext.createBufferSource();

        var request = new XMLHttpRequest();

        request.open( 'GET', self.file.val, true );
        request.responseType = 'arraybuffer';

        request.onload = function()
        {
            var audioData = request.response;

            audioContext.decodeAudioData( audioData, function(res)
            {
                buffer=res;
                console.log('sound load complete');
                self.media.buffer = res;
                self.media.connect(self.filter);
                self.audioOut.val = self.filter;

                patch.loading.finished(loadingId);

                // if(!window.gui)
                // {
                //     self.media.start(0);
                //     playing=true;
                // }
            } );

        };

        request.send();
    }

    self.patch.timer.onPlayPause(seek);
    self.patch.timer.onTimeChange(seek);
};

