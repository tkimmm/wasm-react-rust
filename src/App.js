import React from "react";
// import logo from "./logo.svg";
import "./App.css";

class App extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			nativeModule: null,
		};

		this.showGreet = this.showGreet.bind(this);
	}

	componentDidMount() {
		import("./rustbackend/build").then((native) => {
			this.setState({
				nativeModule: native,
			});
		});
	}

	showGreet() {
		const { nativeModule } = this.state;

		if (!nativeModule) {
			alert("Please try after some time...");
		} else {
			console.dir(nativeModule);
			nativeModule
				.run("tkimmm/powerbi-client-react")
				.then((data) => {
					this.setState({ message: data.name });

					console.log(data);

					console.log(
						"The latest commit to the %s branch is:",
						data.name
					);
					console.log(
						"%s, authored by %s <%s>",
						data.commit.sha,
						data.commit.commit.author.name,
						data.commit.commit.author.email
					);
				});

			nativeModule.showGreet();
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					WebAssembly with Rust and React (Using
					create-react-app)
					<p>{this.state.message}</p>
					<button onClick={this.showGreet}>
						show branch information
					</button>
				</header>
			</div>
		);
	}
}

export default App;
