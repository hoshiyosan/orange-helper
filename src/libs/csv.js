/**
 * Object that abstract generation and downloading of a CSV file.
 */
export class CSV {
    constructor(...headers) {
        this.headers = headers;
        this.rows = [];
    }

    addRow(...row) {
        this.rows.push(row);
    }

    addRowFromJson(data) {

    }

    blob() {
        let content = this.headers.join(";");
        for (let row of this.rows) {
            console.log(row);
            content += "\n" + row.map(elt => JSON.stringify(elt)).join(";")
        }
        return new Blob([content], { type: 'text/csv;charset=latin-1;' });
    }

    download(filename) {
        var link = document.createElement("a");
        var url = URL.createObjectURL(this.blob());
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        console.log(link);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default CSV