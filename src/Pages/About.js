import React, { Component } from 'react';
import FactStore from '../Stores/Fact';

let getState = () => {
    return {
        facts: FactStore.getFacts()
    };
};

class About extends Component {
    constructor(props) {
        super(props);

        this.state = getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        FactStore.addChangeListener(this.onChange);
        FactStore.provideFacts();
    }

    componentWillUnmount() {
        FactStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState(getState());
    }

    render() {
        let facts = this.state.facts.map((fact, index) => {
            let e = fact.elements;
            let title = e.title.value;
            let content = e.description.value;
            let imageLink = e.image.value[0].url;

            if (index % 2 === 0) {
                return (
                    <section className="row text-and-image" key={index}>
                        <h2 className="col-lg-12">{title}</h2>
                        <div className="col-md-6">
                            <div className="text-and-image-text" dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>
                        <div className="col-md-6">
                            <img alt={title} className="img-responsive" src={imageLink} title={title} />
                        </div>
                    </section>
                );
            }

            return (
                <section className="row text-and-image" key={index}>
                    <h2 className="col-lg-12">{title}</h2>
                    <div className="col-md-6 col-md-push-6">
                        <div className="text-and-image-text-right" dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>
                    <div className="col-md-6 col-md-pull-6">
                        <img alt={title} className="img-responsive" src={imageLink} title={title} />
                    </div>
                </section>
            );
        });

        return (
            <div className="container">
                {facts}
            </div>
        );
    }
}

export default About;