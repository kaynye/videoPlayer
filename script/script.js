vi=document.getElementById("video");
r=document.getElementById("range");
vol=document.getElementById("vol");
mute=document.getElementById("mute");

function pauseOrPlay(){
	if(vi.getAttribute('lecteur')==1){
		vi.pause();
		vi.setAttribute('lecteur',0);
		$('#pausePlay').css("background-image","url(media/pause.png)")
	}else{
		vi.play();
		vi.setAttribute('lecteur',1);
		$('#pausePlay').css("background-image","url(media/play.png)")
	}
}

function changeTime(value){
	//value=document.getElementById('range').value;
	vi.currentTime=value;
}

$('#vol').change(function () {
    var val = $(this).val();
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val/5 + ', 	#330000	), '
                + 'color-stop(' + val/5 + ', #C5C5C5)'
                + ')'
                );
});

$('#range').change(function () {
    var val = ($(this).val() - r.min / 	vi.duration - r.min);
	
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + (r.value*100/Math.floor(vi.duration))/100 + ', 	#330000	), '
                + 'color-stop(' + (r.value*100/Math.floor(vi.duration))/100 + ', #C5C5C5)'
                + ')'
                );
	vi.setAttribute('lecteur',1);
	$('#pausePlay').css("background-image","url(media/play.png)")
});

vi.ontimeupdate = function() {
		r.max=vi.duration
		r.value=vi.currentTime;
		var val = ($('#range').val() - r.min / vi.duration - r.min);
		$('#range').css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + (r.value*100/Math.floor(vi.duration))/100 + ', 	#330000	), '
                + 'color-stop(' + (r.value*100/Math.floor(vi.duration))/100 + ', #C5C5C5)'
                + ')'
                );
};

r.addEventListener("mousemove",function(event){
		d=document.getElementById('pop');
		document.getElementById('pop').innerHTML=formatTime(r.value*vi.duration/100);
		d.style.left = event.clientX+'px';
		d.style.top = event.clientY-40+'px';
	
});
function formatTime(time){   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = Math.round(time % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

mute.addEventListener("click", function() {
  if (vi.muted == false) {
    vi.muted = true;
    mute.innerHTML = "Unmute";
  } else {
    vi.muted = false;
    mute.innerHTML = "Mute";
  }
});

vol.addEventListener("change", function() {
  vi.volume = vol.value/5;
});