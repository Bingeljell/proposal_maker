import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, ImageRun } from 'docx';
import { saveAs } from 'file-saver';
import { Proposal, CostingSection, ScopeSection } from '../types';
import { formatCurrency } from './currency';

export const generateDocx = async (proposal: Proposal) => {
  const { meta, execSummary, scope, costing } = proposal;

  const sections: any[] = [];

  // --- 1. Cover Page ---
  const coverChildren = [
    new Paragraph({
      text: meta.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { before: 4000, after: 400 },
    }),
    new Paragraph({
      text: `Prepared for: ${meta.clientName}`,
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: `Date: ${new Date(meta.date).toLocaleDateString()}`,
      alignment: AlignmentType.CENTER,
      spacing: { after: 2000 },
    }),
  ];

  // Attempt to add Logo if exists
  if (meta.logo) {
      try {
          // Check if it's base64 data URI
          if (meta.logo.startsWith('data:image')) {
            const base64Data = meta.logo.split(',')[1];
            // Basic validation/conversion would happen here in a real app
             coverChildren.unshift(new Paragraph({
                children: [
                    new ImageRun({
                        data: Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)),
                        transformation: {
                            width: 150,
                            height: 150,
                        },
                        type: "png", // Assuming PNG for simplicity/fallback, docx lib handles most common types
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 1000 },
             }));
          }
      } catch (e) {
          console.warn("Could not add logo to DOCX", e);
      }
  }

  sections.push({
    properties: {},
    children: [
        ...coverChildren,
        new Paragraph({ text: "", pageBreakBefore: true }), // Force new page
    ],
  });

  // --- 2. Executive Summary ---
  // Note: HTML to Docx is complex. We'll strip HTML tags for now or do basic text extraction.
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  sections[0].children.push(
      new Paragraph({
          text: "Executive Summary",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
          text: stripHtml(execSummary.summary),
          spacing: { after: 400 },
      }),
      new Paragraph({
          text: "Key Objectives",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 },
      }),
      new Paragraph({
          text: stripHtml(execSummary.objectives),
          spacing: { after: 400 },
      })
  );

  // --- 3. Scope of Work ---
  sections[0].children.push(
      new Paragraph({
          text: "Scope of Work",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 600, after: 300 },
      })
  );

  scope.forEach((section: ScopeSection) => {
      sections[0].children.push(
          new Paragraph({
              text: section.name,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 100 },
          }),
          new Paragraph({
            text: stripHtml(section.description),
            spacing: { after: 200 }
          })
      );

      // Deliverables List
      section.deliverables.forEach(del => {
          sections[0].children.push(
              new Paragraph({
                  text: `• ${del.quantity}x ${del.description}`,
                  spacing: { after: 50 },
                  indent: { left: 720 }, // Indent bullet
              })
          );
      });
  });

  // --- 4. Commercials (Table) ---
  sections[0].children.push(
    new Paragraph({
        text: "Commercials",
        heading: HeadingLevel.HEADING_1,
        pageBreakBefore: true,
        spacing: { after: 300 },
    })
  );

  costing.forEach((section: CostingSection) => {
      sections[0].children.push(
        new Paragraph({
            text: section.title,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
        })
      );

      const tableRows = [
          new TableRow({
              children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Item", bold: true })] })], width: { size: 40, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Qty", bold: true })], alignment: AlignmentType.RIGHT })], width: { size: 10, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Rate", bold: true })], alignment: AlignmentType.RIGHT })], width: { size: 25, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Total", bold: true })], alignment: AlignmentType.RIGHT })], width: { size: 25, type: WidthType.PERCENTAGE } }),
              ],
          }),
      ];

      section.items.forEach(item => {
        if (item.optional) return; // Skip optional for now in basic export, or label it

        const total = (item.quantity * item.rate) * (1 - (item.discount || 0)/100) * (1 + (item.taxRate || 0)/100);

        tableRows.push(
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph(item.description)] }),
                    new TableCell({ children: [new Paragraph({ text: item.quantity.toString(), alignment: AlignmentType.RIGHT })] }),
                    new TableCell({ children: [new Paragraph({ text: formatCurrency(item.rate, meta.currency), alignment: AlignmentType.RIGHT })] }),
                    new TableCell({ children: [new Paragraph({ text: formatCurrency(total, meta.currency), alignment: AlignmentType.RIGHT })] }),
                ],
            })
        );
      });

      sections[0].children.push(
          new Table({
              rows: tableRows,
              width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: "", spacing: { after: 200 } })
      );
  });

  // --- Generate ---
  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const fileName = meta.proposalName.trim() || meta.title || "Proposal";
  saveAs(blob, `${fileName.replace(/\s+/g, '_')}.docx`);
};
