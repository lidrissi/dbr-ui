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

const ImageListView = ({ dashboard, onClick }) => {

  const updatedAt = new Date(dashboard.updatedAt).toDateString()
  return (
    <Col sm="6" lg="4" xl="3" className="mb-3" key={dashboard._id}>
      <Card>
        <div className="position-relative">
          <CardImg top alt={dashboard.name} src={`assets/images/dashboard.png`} loading="lazy" />
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
                {dashboard.name}
              </CardSubtitle>
              <CardText className="text-muted text-one mb-0 font-weight-light">
                {dashboard?.description?.toLowerCase()}
                <br />
                {updatedAt}
              </CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

ImageListView.propTypes = {
  changeMode: PropTypes.func,
  dashboard: PropTypes.shape({
    _id: PropTypes.any,
    description: PropTypes.string,
    img: PropTypes.func,
    name: PropTypes.any,
    path: PropTypes.any,
    type: PropTypes.string,
    updatedAt: PropTypes.any,
  }),
  setDashboardDetails: PropTypes.func,
}

export default React.memo(ImageListView)
