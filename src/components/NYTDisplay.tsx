import React from "react";
import { Article, Keywords } from "../types";
import {Row, Col, Button, Container} from 'reactstrap';

interface AcceptedProps {
    results: Article[],
    showPrevious: string,
    showNext: string,
    updatePageNumber: (event: number) => void
}


const NYTDisplay: React.FunctionComponent<AcceptedProps> = (props) =>  {
    return (
    <div>
        <Container className="button-group">
        <Row>
            <Col className="col-md-6">
            <Button color="secondary" style={{display: `${props.showPrevious}`}} onClick={(e) => props.updatePageNumber(-1)}>Prev</Button>
            </Col>
            <Col className="col-md-6">
            <Button className="next-button" color="secondary" style={{display: `${props.showNext}`}} onClick={(e) => props.updatePageNumber(1)}>Next</Button>
            </Col>
        </Row>
        </Container>
        {props.results.map((article: Article, index) => {
            return(
                <Row className="results" key={index}>
                    <h4><a href={article.web_url} target="blank">{article.headline.main}</a></h4>
                    <p>{article.keywords.map((keyword: Keywords, index: number) => {
                        return(
                            <span key={index}>{`${keyword.value}, `}</span>
                        )
                    })}</p>
                    {article.multimedia.length > 0 ? <img src={`http://www.nytimes.com/${article.multimedia[0].url}`} alt={article.headline.main} /> : null}
                </Row>
            )
        })}
    </div>
  );
}

export default NYTDisplay;
