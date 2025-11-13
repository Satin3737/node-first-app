import fs, {type ReadStream} from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import {InvoicesDir, RootDir} from '@/const';
import type {IOrder} from '@/models';

class InvoicePdf {
    private readonly order: IOrder;
    private readonly invoicesPath: string;
    public readonly pdfName: string;
    public pdf: PDFKit.PDFDocument;

    constructor(order: IOrder) {
        this.order = order;
        this.pdfName = `invoice-${this.order._id}.pdf`;
        this.invoicesPath = path.join(RootDir, InvoicesDir, this.pdfName);
        this.pdf = new PDFDocument();
    }

    public createInvoice(): void {
        const products = this.order.products;

        this.pdf.fontSize(24).text(`Invoice #${this.order._id}`, {underline: true});
        this.pdf.fontSize(20).text('-----------------------');
        products.forEach(({product, quantity}) => {
            this.pdf.fontSize(16).text(`${product.title} - ${quantity} x $${product.price}`);
        });
        this.pdf.fontSize(20).text('-----------------------');
        this.pdf.fontSize(20).text(`Total Price: $${products.reduce((sum, prod) => sum + prod.product.price, 0)}`);
        this.pdf.end();
    }

    public saveToFile(): void {
        this.pdf.pipe(fs.createWriteStream(this.invoicesPath));
        this.createInvoice();
    }

    public static getFromFile(order: IOrder): ReadStream | PDFKit.PDFDocument {
        const invoicePdf = new InvoicePdf(order);
        const invoiceExists = fs.existsSync(invoicePdf.invoicesPath);

        if (invoiceExists) return fs.createReadStream(invoicePdf.invoicesPath);

        invoicePdf.saveToFile();
        return invoicePdf.pdf;
    }
}

export default InvoicePdf;
