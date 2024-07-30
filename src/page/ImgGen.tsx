import { useEffect, useRef, useState } from "react";

export function ImgGen() {
  const [file, setFile] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [disable,setDisable]=useState<boolean>(true);

  // Handle file input change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
    setDisable(false);
  }

  // Handle title input change
  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function downloadImage() {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas.imgage.png";
      link.click();
    }
  }
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (!context) return;
      if (context) {
        const background = new Image();
        const outline = new Image();
        const icon = new Image();
        const thumbnail = new Image();

        background.setAttribute("crossorigin", "anonymous");
        outline.setAttribute("crossorigin", "anonymous");
        icon.setAttribute("crossorigin", "anonymous");
        thumbnail.setAttribute("crossorigin", "anonymous");

        // Image sources
        background.src = "https://i.postimg.cc/TwC0X61Z/Untitled-design-7.png";
        outline.src = "https://i.postimg.cc/q7BQDqM8/test.png";
        icon.src = "https://i.postimg.cc/tRN9XpjB/icons8-youtube-200.png";
        thumbnail.src = file;

        // Draw background
        background.onload = () => {
          context.drawImage(background, 0, 0, canvas.width, canvas.height);

          // Draw text
          context.font = "130px Calibri";
          context.fillStyle = "white";
          context.textAlign = "center";
          context.fillText("New YT Video!", canvas.width / 1.7, 360);
        };

        // Draw outline
        outline.onload = () => {
          context.drawImage(
            outline,
            0,
            0,
            outline.width,
            outline.height,
            47,
            400,
            986,
            555
          );
        };

        // Draw icon
        icon.onload = () => {
          context.drawImage(icon, 50, 220, 200, 200);
        };

        // Draw thumbnail and wrapped text
        thumbnail.onload = () => {
          context.drawImage(thumbnail, 66, 414, 949, 530);

          // Draw wrapped text
          const maxWidth = 1450; // Max width for text wrapping
          const lineHeight = 100; // Space between lines
          const x = canvas.width / 2 + 2;
          const y = canvas.height / 2 + 100;

          // Function to wrap text

          function wrapText(text: string, maxWidth: number) {
            const words = text.split(" ");
            let line = "";
            const lines: string[] = [];

            words.forEach((word) => {
              if (!context) return;
              const testLine = line + word + " ";
              const metrics = context.measureText(testLine);
              if (metrics.width > maxWidth && line !== "") {
                lines.push(line);
                line = word + " ";
              } else {
                line = testLine;
              }
            });
            lines.push(line);
            return lines;
          }

          // Draw text
          const lines = wrapText(title, maxWidth);
          context.font = "80px Calibri";
          context.fillStyle = "white";
          context.textAlign = "center";

          lines.forEach((line, index) => {
            context.fillText(line, x, y + index * lineHeight);
          });
        };
      }
    }
  }, [file, title]);
  
    return(
        <div className="flex flex-col items-center justify-center min-h-screen  p-4">
        <div className="flex">
            <div className="flex flex-col justify-center pb-7 px-3">

            <img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/instagram-new--v1.png" alt="instagram-new--v1"/>
            </div>
            <div className="flex flex-col text-white">

      <h1 className="text-4xl font-bold mb-1">Instagram Story Generator</h1>
      <div className="mb-8">Generate Instagram Stories for Youtube</div>
        </div>
            </div>
      
      <div className="flex flex-col items-center space-y-4">
            <input 
              type="text" 
              placeholder="Enter Story Caption" 
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-96" 
              onChange={handleTitle} 
            />
        <div className="relative">
          <input 
            type="file" 
            id="fileUpload" 
            className="hidden" 
            onChange={handleChange} 
          />
          <label 
            htmlFor="fileUpload" 
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Upload Image
          </label>
        </div>
        
        <div className="text-white pt-3">
            Download to preview your template
        </div>
        <button 
          onClick={downloadImage} 
          className={`text-white px-4 py-2 rounded-md ${disable?"bg-green-700 cursor-not-allowed":"bg-green-500 hover:bg-green-600"} `}
          disabled={disable}
        >
          Download
        </button>
      </div>
      
      <div className="hidden">
        <canvas ref={canvasRef} width="1080" height="1920"></canvas>
      </div>
    </div>
    )
  
  
  
  
  
}
