import React, { memo } from 'react'
import { Badge, Modal, ModalBody, ModalHeader } from 'reactstrap'


const AboutModal = memo(({
    widget,
    toggle,
    isOpen
}) => {

    let inputAppParam = []
    if (widget?.datasource?.query?.urlParams?.length > 0) {
        inputAppParam = widget.datasource.query.urlParams
    }

    const outputAppParam = (widget.mappingParams || []).map(({ appParam }) => appParam)

    const details = [
        {
            icon: 'text-success iconsminds-arrow-inside',
            color: "success",
            params: inputAppParam
        },
        {
            icon: 'text-danger iconsminds-arrow-outside',
            color: "danger",
            params: outputAppParam
        }
    ]
    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} className="p-3">About</ModalHeader>
            <ModalBody>
                {
                    details.map(({ icon, color, params }) => (
                        <div key={icon} className="mt-1 mb-1 d-flex align-items-center">
                            <span className="mr-3 d-block"><i className={icon} /></span>
                            <div>
                                {
                                    (params?.length > 0) ?
                                        params.map((param, index) => (
                                            <h6 key={index} className="d-inline-block m-0">
                                                <Badge key={index} color={color} className={`mb-1 mr-1 badge-pill`}>
                                                    {param}
                                                </Badge>
                                            </h6>
                                        ))
                                        :
                                        <span className="text-small text-black-50"> No app param</span>
                                }
                            </div>

                        </div>
                    ))
                }
            </ModalBody>
        </Modal>
    )
})


export default AboutModal