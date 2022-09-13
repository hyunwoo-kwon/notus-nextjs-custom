export class SearchAddressParam {
    constructor(type, address) {
        this.value = [{type,address}];
    }

    addAddress(type, address){
        this.value.push({type,address});
    }

}

export class AddressParam{
    constructor(address) {
        this.address = address;
    }
}