import { Proposal } from '../types';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableCell, TableRow, WidthType } from 'docx';

/**
 * Export proposal to Word document (.docx)
 * Uses the docx library for client-side generation
 */
export const exportToWord = async (proposal: Proposal): Promise<void> => {
  const { meta, execSummary, scope, clientResponsibilities, outOfScope, team, costing, rateCard, terms, signOff } = proposal;
  
  // Calculate grand total
  const grandTotal = costing.reduce(
    (acc, section) => acc + section.items.reduce((sAcc, item) => sAcc + item.quantity * item.rate, 0),
    0
  );

  // Helper to create section headings
  const createHeading = (text: string, level: 'Heading1' | 'Heading2' | 'Heading3' | 'Title' = 'Heading1') => 
    new Paragraph({
      text,
      heading: level,
      spacing: { before: 400, after: 200 },
    });

  // Helper to create normal text
  const createText = (text: string, options?: { bold?: boolean; size?: number }) =>
    new Paragraph({
      children: [
        new TextRun({
          text,
          bold: options?.bold,
          size: options?.size ? options.size * 2 : 22, // docx uses half-points
        }),
      ],
      spacing: { after: 120 },
    });

  // Build document children (Paragraphs and Tables)
  const children: (Paragraph | Table)[] = [];

  // Cover Page
  children.push(
    new Paragraph({ text: '', spacing: { before: 2000 } }),
    new Paragraph({
      text: meta.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: `Prepared for: ${meta.clientName}`,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: `Date: ${meta.date}`,
      alignment: AlignmentType.CENTER,
      spacing: { after: 800 },
    })
  );

  // Executive Summary
  if (execSummary.summary || execSummary.objectives) {
    children.push(
      createHeading('Executive Summary'),
      ...execSummary.summary.split('\n').map(line => createText(line)),
      createHeading('Objectives', 'Heading2'),
      ...execSummary.objectives.split('\n').map(line => createText(line))
    );
  }

  // Scope of Work
  if (scope.length > 0) {
    children.push(createHeading('Scope of Work'));
    
    for (const section of scope) {
      children.push(createHeading(section.name, 'Heading2'));
      children.push(...section.description.split('\n').map(line => createText(line)));
      
      if (section.deliverables.length > 0) {
        children.push(createText('Deliverables:', { bold: true }));
        for (const del of section.deliverables) {
          children.push(createText(`• ${del.description}: ${del.quantity}`));
        }
      }
    }
  }

  // Client Responsibilities
  if (clientResponsibilities.length > 0) {
    children.push(createHeading('Client Responsibilities'));
    for (const req of clientResponsibilities) {
      children.push(createText(`• ${req}`));
    }
  }

  // Out of Scope
  if (outOfScope.length > 0) {
    children.push(createHeading('Out of Scope'));
    for (const item of outOfScope) {
      children.push(createText(`• ${item}`));
    }
  }

  // Proposed Team
  if (team.length > 0) {
    children.push(createHeading('Proposed Team'));
    
    for (const member of team) {
      children.push(createHeading(`${member.name} - ${member.role}`, 'Heading2'));
      children.push(createText(`Allocation: ${member.allocation}%`));
      children.push(...member.description.split('\n').map(line => createText(line)));
    }
  }

  // Commercials / Costing
  if (costing.length > 0) {
    children.push(createHeading('Commercials'));
    
    for (const section of costing) {
      children.push(createHeading(section.title, 'Heading2'));
      
      // Create table for items
      const tableRows: TableRow[] = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Item', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Qty', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Rate', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Total', bold: true })] })] }),
          ],
        }),
      ];

      for (const item of section.items) {
        const total = item.quantity * item.rate;
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(item.description)] }),
              new TableCell({ children: [new Paragraph(String(item.quantity))] }),
              new TableCell({ children: [new Paragraph(String(item.rate))] }),
              new TableCell({ children: [new Paragraph(String(total))] }),
            ],
          })
        );
      }

      children.push(
        new Table({
          rows: tableRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        })
      );
    }

    // Grand Total
    children.push(
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Total Investment: ', bold: true, size: 24 }),
          new TextRun({ text: String(grandTotal), size: 24 }),
        ],
        alignment: AlignmentType.RIGHT,
      })
    );
  }

  // Rate Card
  if (rateCard.length > 0) {
    children.push(createHeading('Rate Card'));
    
    for (const section of rateCard) {
      children.push(createHeading(section.name, 'Heading2'));
      
      const tableRows: TableRow[] = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Deliverable', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Comment', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Qty', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Unit Cost', bold: true })] })] }),
          ],
        }),
      ];

      for (const item of section.items) {
        tableRows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(item.description)] }),
              new TableCell({ children: [new Paragraph(item.comment)] }),
              new TableCell({ children: [new Paragraph(String(item.quantity))] }),
              new TableCell({ children: [new Paragraph(String(item.unitCost))] }),
            ],
          })
        );
      }

      children.push(
        new Table({
          rows: tableRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        })
      );
    }
  }

  // Terms & Conditions
  if (terms) {
    children.push(createHeading('Terms & Conditions'));
    children.push(...terms.split('\n').map(line => createText(line)));
  }

  // Sign Off
  if (signOff) {
    children.push(createHeading('Sign Off'));
    children.push(new Paragraph({ 
      children: [new TextRun({ text: signOff.disclaimer, italics: true })] 
    }));
    
    if (signOff.showSignatures) {
      children.push(
        new Paragraph({ spacing: { before: 600 } }),
        new Paragraph({
          text: '_______________________                                        _______________________',
          spacing: { before: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `For ${meta.clientName}`, bold: true }),
            new TextRun({ text: '                                                    For Agency', bold: true }),
          ],
        })
      );
    }

    if (signOff.website || signOff.socials) {
      children.push(new Paragraph({ spacing: { before: 400 } }));
      if (signOff.website) {
        children.push(createText(`Website: ${signOff.website}`));
      }
      if (signOff.socials) {
        children.push(createText(`Social: ${signOff.socials}`));
      }
    }
  }

  // Create document
  const doc = new Document({
    sections: [{
      properties: {},
      children: children as any, // Cast needed due to docx type limitations
    }],
  });

  // Generate blob and download
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = (meta.proposalName || meta.title || 'proposal').replace(/\s+/g, '_');
  link.download = `${fileName}.docx`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

export default exportToWord;
