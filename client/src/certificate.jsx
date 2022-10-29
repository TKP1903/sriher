import jsPDF from "jspdf";
import React, { useEffect, useRef, useState, useSelector } from "react";
import { useParams } from "react-router-dom";
import templates from "./data";

function CertificateGeneratorByImage(userName) {
  const canvas = useRef();
  let ctx = null;
  const data = [
    [
      {
        csvIdx: 2,
        index: 0,
        title: "name",
      },
    ],
    [
      {
        csvIdx: 2,
        index: 0,
        title: "sudheer",
      },
    ],
  ];
  const [textDrawProperties, setTextDrawProperties] = useState(
    templates.png[0].text
  );
  const [open, setOpen] = React.useState(false);
  const [state, forceUpdate] = useState(false);

  useEffect(() => {
    setTextDrawProperties(modifyield(textDrawProperties, data[0]));
  }, []);
  // const reduxState = useSelector((globalStore) => globalStore.user.user);
  // const user_data = reduxState?.user;
  // console.log(user_data);

  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    var imageObj1 = new Image();
    imageObj1.src = "template/t1.jpg";
    imageObj1.onload = function () {
      canvasEle.width = imageObj1.width;
      canvasEle.height = imageObj1.height;
    };
    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    updateCanvas();
  });

  function downloadPdf(uri, name) {
    const pdf = new jsPDF({ orientation: "landscape" });
    const imgProps = pdf.getImageProperties(uri);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(uri, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${name}.pdf`);
  }

  console.log(data);

  function updateCanvas() {
    // var {x, y} = cordinates
    const canvasEle = canvas.current;
    ctx = canvasEle.getContext("2d");
    var imageObj1 = new Image();
    imageObj1.src = "template/t1.jpg";
    imageObj1.onload = function () {
      ctx.drawImage(imageObj1, 0, 0);
      textDrawProperties.map((text, index) => {
        ctx.font = `${text.size}pt Montserrat`;
        ctx.fillStyle = "black";
        ctx.fillText(userName?.userName, text.x, text.y);
      });
      forceUpdate(true);
    };
  }

  return (
    <div className="pt-40">
      <div className="w-full flex items-center justify-center">
        <button
          className="text-gray-50 bg-blue-800 px-2 py-1 rounded-md cursor-pointer text-center font-bold"
          title="Download"
          onClick={() => {
            const c = canvas.current;
            downloadPdf(c.toDataURL("png"), "certificate-pdf");
            // downloadImage(c.toDataURL('png'), 'certificate-image')
          }}
        >
          Download your certificate
        </button>
      </div>
      <div className="">
        <canvas ref={canvas}></canvas>
        {!open ? (
          <div
            color="primary"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <div></div> : <div></div>}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* <div
        title="Download"
        onClick={() => {
          const c = canvas.current;
          downloadPdf(c.toDataURL("png"), "certificate-pdf");
          // downloadImage(c.toDataURL('png'), 'certificate-image')
        }}
      >
        Download
      </div> */}
    </div>
  );
}

function modifyield(defaultArray, dataArray) {
  while (dataArray.length > defaultArray.length) {
    defaultArray.push({
      title: "Title",
      x: Math.floor(Math.random() * 100) + 80,
      y: Math.floor(Math.random() * 100) + 80,
      size: Math.floor(Math.random() * 100) + 10,
    });
  }
  const deleteCount = defaultArray.length - dataArray.length;
  if (dataArray.length < defaultArray.length) {
    defaultArray.splice(-1, deleteCount);
  }
  return defaultArray;
}

export default CertificateGeneratorByImage;

// import React, { useEffect, useRef, useState } from "react";
// import jsPDF from "jspdf";
// import templates from "./data/index";

// const Certificate = () => {
//   const canvas = useRef();
//   let ctx = null;
//   function downloadPdf(uri, name) {
//     const pdf = new jsPDF({ orientation: "landscape" });
//     const imgProps = pdf.getImageProperties(uri);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(uri, "JPEG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${name}.pdf`);
//   }
//   const [textDrawProperties, setTextDrawProperties] = useState(
//     templates.png[0].text
//   );
//   const [state, forceUpdate] = useState(false);

//   useEffect(() => {
//     updateCanvas();
//   });
//   function updateCanvas() {
//     // var {x, y} = cordinates
//     const canvasEle = canvas.current;
//     ctx = canvasEle.getContext("2d");
//     var imageObj1 = new Image();
//     imageObj1.src = "template/t1.png";
//     imageObj1.onload = function () {
//       ctx.drawImage(imageObj1, 0, 0);
//       textDrawProperties.map((text, index) => {
//         ctx.font = `${text.size}pt Montserrat`;
//         ctx.fillStyle = "white";
//         ctx.fillText("sudheerKumar", text.x, text.y);
//       });
//       forceUpdate(true);
//     };
//   }
//   return (
//     <div>
//       <button
//         onClick={() => {
//           const c = canvas.current;
//           downloadPdf(c.toDataURL("png"), "certificate");
//           // downloadImage(c.toDataURL('png'), 'certificate-image')
//         }}
//       >
//         Download
//       </button>
//     </div>
//   );
// };

// export default Certificate;
