import React, { Component } from "react";
import NYTDisplay from "./NYTDisplay";
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import { Article } from "../types";

type AcceptedProps = {};

interface Results {
  resultsArray: Article[],
  searchTerm: string,
  startDate: string,
  endDate: string,
  showPrevious: string,
  showNext: string
}

let pageNumber: number = 0;

class NYT extends Component<AcceptedProps, Results> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      resultsArray: [],
      searchTerm: "",
      startDate: "",
      endDate: "",
      showPrevious: 'none',
      showNext: 'block'
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
    this.updatePageNumber = this.updatePageNumber.bind(this);
    this.checkLength = this.checkLength.bind(this);
  }

  updatePageNumber(e: number){
      if (e === 1) {
        this.setState({
            showPrevious: 'block'
        })
        pageNumber++
      } else if (e === -1 && pageNumber > 1) {
        pageNumber--
      } else if (e === -1 && pageNumber === 1) {
          this.setState({
              showPrevious: 'none'
          })
          pageNumber--
      }
      console.log(pageNumber)
      this.updateFetchResults();
  }

  checkLength(value: number) {
    if (value < 10 && this.state.showNext === 'block') {
        this.setState({
            showNext: 'none'
        })
    } else if (value >= 10 && this.state.showNext === 'none') {
        this.setState({
            showNext: 'block'
        })
    }
  }

  updateFetchResults() {
    const baseURL: string =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const key: string = `${process.env.REACT_APP_KEY}`;
    let url: string;

    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${this.state.searchTerm}`;

    // append start and end dates to url, if included by user
    if (this.state.startDate !== "") {
      url += `&begin_date=${this.state.startDate}`;
    }

    if (this.state.endDate !== "") {
      url += `&end_date=${this.state.endDate}`;
    }

    // fetch our data
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        this.setState({
            resultsArray: results.response.docs
        })
        console.log(this.state.resultsArray)
        this.checkLength(this.state.resultsArray.length)
      })
      .catch((err) => console.log(err));
  }

  updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  updateStartDate(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      startDate: e.target.value,
    });
  }

  updateEndDate(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      endDate: e.target.value,
    });
  }


  fetchResults(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const baseURL: string =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const key: string = `${process.env.REACT_APP_KEY}`;
    let url: string;

    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${this.state.searchTerm}`;

    // append start and end dates to url, if included by user
    if (this.state.startDate !== "") {
      url += `&begin_date=${this.state.startDate}`;
    }

    if (this.state.endDate !== "") {
      url += `&end_date=${this.state.endDate}`;
    }

    // fetch our data
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        this.setState({
            resultsArray: results.response.docs
        })
        console.log(this.state.resultsArray)
        this.checkLength(this.state.resultsArray.length)
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="main">
        <h1 className="header">NYT Article Search</h1>
        <Container>
          <Row>
            <Col className="col-md-6">
              <Form onSubmit={this.fetchResults}>
                <FormGroup>
                  <Label for="search">
                    Enter a SINGLE search term (required):{" "}
                  </Label>
                  <Input
                    type="text"
                    id="search"
                    className="search"
                    value={this.state.searchTerm}
                    required
                    onChange={this.updateSearch}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="start-date">
                    Enter a start date (format DD/MM/YYYY):{" "}
                  </Label>
                  <Input
                    type="date"
                    id="start-date"
                    className="start-date"
                    pattern="[0-9]{8}"
                    value={this.state.startDate}
                    onChange={this.updateStartDate}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="end-date">
                    Enter an end date (format DD/MM/YYYY):{" "}
                  </Label>
                  <Input
                    type="date"
                    id="end-date"
                    className="end-date"
                    pattern="[0-9]{8}"
                    value={this.state.endDate}
                    onChange={this.updateEndDate}
                  />
                </FormGroup>
                <Button color="primary" className="submit">
                  Submit search
                </Button>
              </Form>
            </Col>
            <Col className="col-md-6">
              {this.state.resultsArray.length > 0 ? <NYTDisplay results={this.state.resultsArray} showPrevious={this.state.showPrevious} showNext={this.state.showNext} updatePageNumber={this.updatePageNumber}/> : <h2>Submit a search to see results here</h2>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NYT;
