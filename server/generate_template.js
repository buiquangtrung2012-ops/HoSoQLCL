const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                text: "TIÊU CHÚA CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
                text: "Độc lập - Tự do - Hạnh phúc",
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "", spacing: { after: 400 } }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "BIÊN BẢN NGHIỆM THU CÔNG VIỆC XÂY DỰNG",
                        bold: true,
                        size: 32,
                    }),
                ],
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "", spacing: { after: 400 } }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Tên công việc: ", bold: true }),
                    new TextRun("{{TenCongViec}}"),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Hạng mục: ", bold: true }),
                    new TextRun("{{HangMuc}}"),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Vị trí thi công: ", bold: true }),
                    new TextRun("{{ViTri}}"),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Ngày nghiệm thu: ", bold: true }),
                    new TextRun("{{NgayTN}}"),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Tiêu chuẩn áp dụng: ", bold: true }),
                    new TextRun("{{TieuChuan}}"),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Vật liệu sử dụng: ", bold: true }),
                    new TextRun("{{VatLieu}}"),
                ],
            }),
            new Paragraph({ text: "", spacing: { before: 400 } }),
            new Paragraph({
                text: "ĐẠI DIỆN CÁC BÊN KÝ TÊN",
                alignment: AlignmentType.CENTER,
                bold: true,
            }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    const outputPath = path.join(__dirname, '../templates/template_ntcv.docx');
    fs.writeFileSync(outputPath, buffer);
    console.log('Template created successfully at:', outputPath);
});
