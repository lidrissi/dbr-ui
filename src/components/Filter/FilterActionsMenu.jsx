import React, { memo } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";


const FilterActionsMenu = memo(({
    onDelete,
    onEdit
}) => {

    return (
        <UncontrolledDropdown >
            <DropdownToggle tag="span" size="xs">
                <i className="simple-icon-options-vertical" />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={onEdit} tag="span">Edit</DropdownItem>
                <DropdownItem onClick={onDelete} tag="span">Delete</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
})

export default FilterActionsMenu