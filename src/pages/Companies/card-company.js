import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Col,
  Card,
  CardBody,
  UncontrolledTooltip,
  Media,
  Badge,
} from 'reactstrap';

import imgDefault from '../../assets/images/companies/img-4.png';

class CardCompany extends Component {
  render() {
    const { companies, path } = this.props;
    return (
      <React.Fragment>
        {companies &&
          companies.map((company, key) => (
            <Col xl="4" sm="6" key={'_company_' + key}>
              <Card>
                <CardBody>
                  <Media>
                    <div className="avatar-md mr-4">
                      <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                        <img
                          src={company.logo ? company.logo : imgDefault}
                          alt=""
                          height="30"
                        />
                      </span>
                    </div>

                    <Media className="overflow-hidden" body>
                      <h5 className="text-truncate font-size-15">
                        <Link
                          to={`${path}/${company.id}`}
                          className="text-dark"
                        >
                          {company.name}
                        </Link>
                      </h5>
                      <p className="text-muted mb-4">{company.description}</p>

                      <div className="team">
                        {company.child &&
                          company.child.map((team, key) =>
                            team.img !== 'Null' ? (
                              <Link
                                to="#"
                                className="team-member d-inline-block"
                                id={'member' + team.id}
                                key={'_team_' + key}
                              >
                                <img
                                  src={team.img}
                                  className="rounded-circle avatar-xs m-1"
                                  alt=""
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target={'member' + team.id}
                                >
                                  {team.name}
                                </UncontrolledTooltip>
                              </Link>
                            ) : (
                              <Link
                                to="#"
                                className="team-member d-inline-block"
                                id={'member' + team.id}
                                key={'_team_' + key}
                              >
                                <div className="avatar-xs m-1">
                                  <span
                                    className={
                                      'avatar-title rounded-circle bg-soft-' +
                                      team.color +
                                      ' text-' +
                                      team.color +
                                      ' font-size-16'
                                    }
                                  >
                                    {team.name.charAt(0)}
                                  </span>
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={'member' + team.id}
                                  >
                                    {team.name}
                                  </UncontrolledTooltip>
                                </div>
                              </Link>
                            )
                          )}
                      </div>
                    </Media>
                  </Media>
                </CardBody>
                <div className="px-4 py-3 border-top">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item mr-3">
                      <Badge color={company.color}>{company.status}</Badge>
                    </li>
                    <li className="list-inline-item mr-3" id="dueDate">
                      <i className="bx bx-calendar mr-1"></i> {company.date}
                      <UncontrolledTooltip placement="top" target="dueDate">
                        Due Date
                      </UncontrolledTooltip>
                    </li>
                    <li className="list-inline-item mr-3" id="comments">
                      <i className="bx bx-comment-dots mr-1"></i>{' '}
                      {company.comments}
                      <UncontrolledTooltip placement="top" target="comments">
                        Comments
                      </UncontrolledTooltip>
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>
          ))}
      </React.Fragment>
    );
  }
}

export default CardCompany;
