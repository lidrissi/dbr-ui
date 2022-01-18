import PropTypes from 'prop-types'
import React from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  Badge,
} from 'reactstrap'

const ImageListView = ({ name, description, updatedAt, onClick }) => {

  return (
    <Col sm="6" lg="4" xl="3" className="mb-3">
      <Card>
        <div className="position-relative">
          <CardImg top alt={name} src={`assets/images/dashboard.png`} loading="lazy" />
          <Badge
            type="button"
            pill
            color="info"
            className="position-absolute badge-top-left d-flex badge-info"
            onClick={onClick}
          >
            <i className="simple-icon-share-alt text-one px-1" />
          </Badge>
        </div>
        <CardBody className="py-3">
          <Row>
            <Col xxs="10" className="mb-3">
              <CardSubtitle className="text-mlarge mb-1 text-capitalize">
                {name}
              </CardSubtitle>
              <CardText className="text-muted text-one mb-0 font-weight-light">
                {(description && description.length > 0) ? description?.toLowerCase() : ''}
                <br />
                {new Date(updatedAt)?.toDateString() || ''}
              </CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

ImageListView.propTypes = {
  name: PropTypes.any,
  description: PropTypes.string,
  updatedAt: PropTypes.any,
}

export default React.memo(ImageListView)
