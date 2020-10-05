import { LightningElement, track, wire } from 'lwc';
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    error = undefined;
    @track searchOptions;

    @wire(getBoatTypes)
    boatTypes({ data, error }) {
        if (data) {
            this.searchOptions = [];
            this.searchOptions.push({ label: 'All Types', value: '' });
            data.forEach(eachData => {
                this.searchOptions.push({
                    label: eachData.Name,
                    value: eachData.Id
                });
            });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
            console.error('Error in Get Boat Types',error);
        }
    }

    handleSearchOptionChange(event) {
        event.preventDefault();
        this.selectedBoatTypeId = event.detail.value;
        const searchEvent = new CustomEvent("search", {
            detail: { boatTypeId: this.selectedBoatTypeId }
        });
        this.dispatchEvent(searchEvent);
    }
}