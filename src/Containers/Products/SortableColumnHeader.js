import React from 'react';
import './SortableColumnHeader.css';
import Button from "../../components/Button/Button";

class SortableColumnHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(e) {
        this.props.onSort(this.props.column, e.target.name);
    }
    render() {
        let currentSort = this.props.currentSort.column === this.props.column ? this.props.currentSort.direction : false;

        return (
            <th>
                {console.log(this.props.currentSort.column, " ", this.props.column, " ", this.props.currentSort.direction)}

                <Button
                    onClick={this.handleSort}
                    type={"btn"}
                    name='asc'
                    action={this.handleSort}
                    title={"\u25b2"}
                    isDisabled={currentSort === 'asc' ? 'true' : ''}
                />
                <Button
                    onClick={this.handleSort}
                    type={"btn"}
                    name='desc'
                    action={this.handleSort}
                    title={"\u25bc"}
                    isDisabled={currentSort === 'desc' ? 'true' : ''}
                />
            </th>
        );
    }
}

export default SortableColumnHeader;