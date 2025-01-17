const video = document.querySelector('video');
//视频资源存放路径，假设下面有5个分段视频 video1.mp4 ~ video5.mp4，第一个段为初始化视频init.mp4
const assetURL = "http://www.demo.com";
//视频格式和编码信息，主要为判断浏览器是否支持视频格式，但如果信息和视频不符可能会报错
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource); //将video与MediaSource绑定，此处生成一个Blob URL
    mediaSource.addEventListener('sourceopen', sourceOpen); //可以理解为容器打开
} else {
    //浏览器不支持该视频格式
    console.error('Unsupported MIME type or codec: ', mimeCodec);
}

function sourceOpen () {
    const mediaSource = this;
    const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    let i = 1;
    function getNextVideo(url) {
        //ajax代码实现翻看上文，数据请求类型为arraybuffer
        ajax(url, function(buf) {
            //往容器中添加请求到的数据，不会影响当下的视频播放。
            sourceBuffer.appendBuffer(buf);
        });
    }
    //每次appendBuffer数据更新完之后就会触发
    sourceBuffer.addEventListener("updateend", function() {
        if (i === 1) {
            //第一个初始化视频加载完就开始播放
            video.play();
        }
        if (i < 6) {
            //一段视频加载完成后，请求下一段视频
            getNextVideo(`${assetURL}/video${i}.mp4`);
        }
        if (i === 6) {
            //全部视频片段加载完关闭容器
            mediaSource.endOfStream();
            URL.revokeObjectURL(video.src); //Blob URL已经使用并加载，不需要再次使用的话可以释放掉。
        }
        i++;
    });
    //加载初始视频
    getNextVideo(`${assetURL}/init.mp4`);
};

