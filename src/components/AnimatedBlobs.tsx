export default function AnimatedBlobs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="blob blob-purple w-[500px] h-[500px] -top-[100px] left-[10%]" />
            <div className="blob blob-cyan w-[400px] h-[400px] top-[60%] right-[5%]" />
            <div className="blob blob-blue w-[350px] h-[350px] bottom-[5%] left-[30%]" />
        </div>
    );
}
