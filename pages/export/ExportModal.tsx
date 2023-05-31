import React, { useEffect } from "react";
import DomToImage from "dom-to-image";
import { saveAs } from "file-saver";

export default function ExportModal() {
    const node = document.getElementById("my_dataviz");
    const showPNG = () => {
        DomToImage.toPng(node)
            .then((dataUrl) => {
                const img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const downloadPng = () => {
        DomToImage.toBlob(node).then((blob) => {
            saveAs(blob, "my_dataviz.png");
        });
    };
    const downloadJpeg = () => {
        DomToImage.toJpeg(node, { quality: 0.95 }).then(function (dataUrl) {
            var link = document.createElement("a");
            link.download = "my_dataviz.jpeg";
            link.href = dataUrl;
            link.click();
        });
    };
    const downloadSvg = () => {
        const data = new XMLSerializer().serializeToString(node);
        const blob = new Blob([data], {
            type: "image/svg+xml;charset=utf-8",
        });
        const link = document.createElement("a");
        link.download = "my_dataviz.svg";
        link.href = URL.createObjectURL(blob);
        link.click();
    };

    return (
        <div>
            <button className="export" onClick={() => downloadPng()}>
                PNG
            </button>
            <button className="export" onClick={downloadJpeg}>
                JPEG
            </button>
            <button className="export" onClick={downloadSvg}>
                SVG
            </button>
        </div>
    );
}
