import DropDownItem from './DropDownItem';

class DropDownSelectorState {
    data: DropDownItem[];
    selectedItem: DropDownItem;
    searchBoxVisible: boolean;
    searchTerm: string;
    itemPosition: number;
}
export default DropDownSelectorState;
