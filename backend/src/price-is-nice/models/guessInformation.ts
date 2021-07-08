export class GuessInformation {

    constructor(
        public price: number,
        public name: string,
        public description?: string,
        public imageUrls: string[] = []
    ) { };


    getAllInformation() {
        return {
            price: this.price,
            name: this.name,
            description: this.description,
            imageUrls: this.imageUrls
        };

    };


    getNonSensitiveInformation() {
        return {
            name: this.name,
            description: this.description,
            imageUrls: this.imageUrls
        };

    };

}