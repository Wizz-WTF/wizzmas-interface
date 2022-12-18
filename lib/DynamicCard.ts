export const generateDynamicCard = (frontUrl: string, backUrl: string): string => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        .flip-card {
            background-color: transparent;
            width: 100%;
            height: 100%;
            perspective: 2000px; /* Remove this if you don't want the 3D effect */
        }
        
        /* This container is needed to position the front and back side */
        .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
        }
        
        /* Position the front and back side */
        .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden; /* Safari */
            backface-visibility: hidden;
        }
        
        .flip-card-front {
          transform: rotateY(0deg);
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      </style>
    </head>

    <body>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front"><img src='${frontUrl}' style="width: 100%; height: 100%; object-fit: contain" /> </div>
            <div class="flip-card-back"><img src='${backUrl}' style="width: 100%; height: 100%; object-fit: contain" /></div>
          </div>
      </div>
    </body>
    </html>`
}