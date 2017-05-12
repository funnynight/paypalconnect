
import React from 'react';
import { Link } from 'react-router';

import { Header } from './header';
import { Editor } from './editor';
import { Code } from './code';

import { patterns } from '../patterns';

function nameToPattern(name) {
    for (let group of patterns) {
        for (let pattern of group.patterns) {
            if (pattern.slug === name) {
                return pattern;
            }
        }
    }
}

export class App extends React.Component {

    constructor() {
        super();
        this.state = {
            env: 'sandbox',
            errors: []
        };
    }

    onChangeCode(code) {
        this.setState({ code, errors: [] });
    }

    componentWillMount() {
        if (window.location.hash === '#/') {
            window.location.hash = '#/pattern/client';
        }

        paypal.onPossiblyUnhandledException(err => {
            // this.setState({ errors: this.state.errors.concat(err.stack || err.toString()) });
        });
    }

    onChangeEnv(env) {
        this.setState({ env });
    }

    onCodeRun(code) {
        this.setState({ errors: [] });
    }

    onCodeError(err) {
        this.setState({ errors: this.state.errors.concat(err.stack || err.toString()) });
    }

    render() {

        let patternName = this.props.params.pattern || 'client';
        let activePattern = nameToPattern(patternName);

        let env = this.state.env;
        let baseURL = document.body.getAttribute('data-base-url');

        return (
            <div>
                <Header onChangeEnv={ env => this.onChangeEnv(env) } />

                <div className="main">
                    <div className="column-left">
                        {
                            patterns.map((group, i) =>
                                <div key={i}>
                                    <h3>{group.name}</h3>
                                    <ul>
                                        {
                                            group.patterns.map(pattern =>
                                                <Link to={`/pattern/${pattern.slug}`} key={pattern.slug} activeClassName="active">
                                                    <li>
                                                        <span className="bullet"></span>
                                                        <span>{ pattern.name }</span>
                                                    </li>
                                                </Link>
                                            )
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </div>

                    <div className="column-middle">

                        <div className="intro">
                            <h3>{activePattern.fullName}</h3>
                            <div className="introp">{activePattern.intro}</div>
                        </div>

                        <div className="demo">
                            <div className="steps">

                                <div className="step right">1. Edit the code</div>

                                <div className="step bottom">2. Try the button</div>

                                { this.state.errors.length
                                    ? <div className="errors">
                                        {
                                            this.state.errors.map(err =>
                                                <p key={err}>{err}</p>
                                            )
                                        }
                                    </div>

                                    : <Code
                                        pattern={patternName}
                                        code={this.state.code}
                                        onError={ err => this.onCodeError(err) } />
                                }

                                <div className="step right">3. Copy code to your site!</div>
                            </div>
                        </div>
                    </div>

                    <div className="column-right">
                        <Editor code={activePattern.code({ env, baseURL })} onChange={val => this.onChangeCode(val)} />
                    </div>
                </div>
            </div>
        );
    }
}
