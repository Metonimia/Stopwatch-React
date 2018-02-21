function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true,
                watch: setInterval(() => this.step(), 10)
            });
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        // wczytanie wartości do zmiennych
        let { minutes, seconds, miliseconds } = this.state.times;

        // modyfikacja zmiennych
        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }

        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        // ustawię stan
        this.setState({
            times: {
                minutes,
                seconds,
                miliseconds
            }
        });
    }

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.state.watch);
    }

    getFormattedTime() {
        const { minutes, seconds, miliseconds } = this.state.times;
        return `${pad0(minutes)}:${pad0(seconds)}:${pad0(
            Math.floor(miliseconds)
        )}`;
    }

    render() {
        return (
            <div>
                <nav>
                    <button className="button" onClick={this.start.bind(this)}>
                        Start{" "}
                    </button>{" "}
                    <button className="button" onClick={this.stop.bind(this)}>
                        Stop{" "}
                    </button>{" "}
                </nav>{" "}
                <div className="stopwatch"> {this.getFormattedTime()} </div>{" "}
                <ul className="results" />
            </div>
        );
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));
