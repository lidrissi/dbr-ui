import React, { memo, useState } from "react";
import { Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import AboutModal from "./AboutModal";


const WidgetActionsMenu = memo(({
    onExpand,
    onExport,
    widget
}) => {

    const [showAppParamsModal, setShowAppParamsModal] = useState(false)

    return (
        <>
            <UncontrolledDropdown className="btn-group" direction="left">
                <DropdownToggle tag="span" size="xs">
                    <i className="simple-icon-options-vertical" />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={onExpand} >Expand</DropdownItem>
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
                    <DropdownItem divider />
                    <DropdownItem onClick={() => setShowAppParamsModal(true)} >
                        About
                        <i className="ml-2 simple-icon-info" />
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <AboutModal
                isOpen={showAppParamsModal}
                toggle={() => setShowAppParamsModal(false)}
                widget={widget}
            />
        </>
    )
})

export default WidgetActionsMenu