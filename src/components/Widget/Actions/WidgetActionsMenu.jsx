import React, { memo } from "react";
import { Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

const WidgetActionsMenu = memo(({
    onExport,
}) => {

    return (
        <>
            <UncontrolledDropdown className="btn-group" direction="left">
                <DropdownToggle tag="span" size="xs">
                    <i className="simple-icon-options-vertical" />
                </DropdownToggle>
                <DropdownMenu>
                    {onExport && <DropdownItem tag="span">
                        Export
                        <div className="d-flex justify-content-center mt-1">
                            <ButtonGroup>
                                {
                                    ['png', 'svg', 'pdf', 'csv'].map(type => <Button
                                        key={type}
                                        color="dark"
                                        outline
                                        className="border-radius p-1"
                                        onClick={() => onExport(type)}
                                    >
                                        {type.toLocaleUpperCase()}
                                    </Button>)
                                }
                            </ButtonGroup>
                        </div>
                    </DropdownItem>}
                </DropdownMenu>
            </UncontrolledDropdown>
        </>
    )
})

export default WidgetActionsMenu