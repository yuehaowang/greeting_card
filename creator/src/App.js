import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import "./App.css";


class App extends React.Component {
	constructor() {
		super();

		this.editorElem = null;
		this.sidebarElem = null;

		this.state = {
			configStr: "",
			showExportResultDialog: false
		};
	}

	exportConfig() {
		if (this.sidebarElem != null && this.editorElem != null && this.editorElem.gridElem != null) {
			let config = this.sidebarElem.getFormConfig();
			config.matrix = this.editorElem.gridElem.getMatrixConfig();

			this.setState({
				showExportResultDialog: true,
				configStr: "var config = " + JSON.stringify(config) + ";"
			});
		}
	}

	render() {
		return (
			<div>
				<div id="main">
					<Editor ref={ele => this.editorElem = ele} />
					<Sidebar
						ref={ele => this.sidebarElem = ele}
						onCreateEditorGrid={() => {
							this.editorElem.createGrid(
								this.sidebarElem.state.config.stageW,
								this.sidebarElem.state.config.stageH,
								this.sidebarElem.state.config.col,
								this.sidebarElem.state.config.row,
								this.sidebarElem.state.config.matrix
							);
						}}
						onExportConfig={this.exportConfig.bind(this)} 
					/>
				</div>
				{this.state.showExportResultDialog ? (
					<div id="over">
						<div className="dialog">
							<h2>Export Result</h2>
							<textarea readOnly={true} defaultValue={this.state.configStr}></textarea>
							<p>* Copy and save the content above to a plain text file suffixed by <i>.js</i>.</p>
							<div className="button-box">
								<button onClick={(e) => {
									this.setState({showExportResultDialog: false});
								}}>OK</button>
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}


export default App;
