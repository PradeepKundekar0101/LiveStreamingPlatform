import WebSocket, { RawData } from "ws"
import {spawn} from "child_process"

const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/dcfx-m7v2-j248-3185-9207`,
];

const ffmpegProcess = spawn("ffmpeg",options as unknown as readonly[])
ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
});

ffmpegProcess.stderr.on('data', (data) => {
    console.error(`ffmpeg stderr: ${data}`);
});

ffmpegProcess.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
});

export class User {
    private id: string
    constructor(private ws: WebSocket) {
        this.id = crypto.randomUUID()
    }
    initHandle = () => {
        this.ws.on("message", (data: RawData) => {
            if (data instanceof Buffer) {
                console.log("Received chunk size:", data.length);
                ffmpegProcess.stdin.write(data,(err)=>{
                    console.log("Error writing data")
                    console.log(err)
                })
            } 
            
        })
    }   
}