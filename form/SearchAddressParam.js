export class SearchAddressParam {
    constructor(type, address, workUUID) {
        this.value = [{type,address, workUUID}];
    }

    addAddress(type, address, workUUID){
        this.value.push({type,address, workUUID});
    }

}

export class AddressParam{
    constructor(address) {
        this.address = address;
    }
}