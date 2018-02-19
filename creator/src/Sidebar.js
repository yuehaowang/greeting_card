import React from "react";
import "./Sidebar.css";


const defaultConfig = {
	documentTitle : "Greeting Card",
	stageW : 800,
	stageH : 480,
	col : 40,
	row : 24,
	emitterNum : 10,

	preface : [
		"Tap to open my greeting card~",
		"Well, continue~",
		"Don't stop tapping until you know my meaning ^_^"
	],

	colorList : [
		"#990000",
		"#FF0000",
		"#CC3300",
		"#CC6600",
		"#CC0033",
		"#FFFF00",
		"#33FF00",
		"#33CC00",
		"#0066FF",
		"#00FF99",
		"#770099"
	],

	matrix: null
};


function normalizeConfig (_config) {
	if (_config === null) {
		_config = {};
	}

	if (typeof _config.documentTitle === "undefined") {
		_config.documentTitle = defaultConfig.documentTitle;
	}

	if (typeof _config.stageW === "undefined") {
		_config.stageW = defaultConfig.stageW;
	}
	if (typeof _config.stageH === "undefined") {
		_config.stageH = defaultConfig.stageH;
	}

	if (typeof _config.col === "undefined") {
		_config.col = defaultConfig.col;
	}
	if (typeof _config.row === "undefined") {
		_config.row = defaultConfig.row;
	}

	if (typeof _config.emitterNum === "undefined") {
		_config.emitterNum = defaultConfig.emitterNum;
	}

	if (typeof _config.preface === "undefined") {
		_config.preface = defaultConfig.preface;
	}

	if (typeof _config.colorList === "undefined") {
		_config.colorList = defaultConfig.colorList;
	}

	if (typeof _config.matrix === "undefined") {
		_config.matrix = defaultConfig.matrix;
	}

	return _config;
}


class ListView extends React.Component {
	constructor(props) {
		super(props);

		this.keyList = [];

		this.state = {
			list: this.props.list,
			itemToAdd: ""
		};

		this.updateKeyList(this.props.list);
	}

	updateKeyList(list) {
		list.forEach((x, i) => {
			const key = x + "@" + i;

			if (i >= this.keyList.length) {
				this.keyList.push(key);
			} else if (key !== this.keyList[i]) {
				this.keyList[i] = key;
			}
		});

		if (this.keyList.length > list.length) {
			this.keyList.splice(list.length, this.keyList.length - list.length);
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			list: nextProps.list
		});

		this.updateKeyList(nextProps.list);
	}

	removeItem(i) {
		this.setState((prev, props) => {
			prev.list.splice(i, 1);
			
			this.updateKeyList(prev.list);

			return {
				list: prev.list
			};
		});
	}

	modifyItem(i, v) {
		this.setState((prev, props) => {
			prev.list[i] = v;

			return {
				list: prev.list
			};
		});
	}

	addItem() {
		this.setState((prev, props) => {
			prev.list.push(this.state.itemToAdd);
			
			this.updateKeyList(prev.list);

			return {
				list: prev.list,
				itemToAdd: ""
			};
		});
	}

	render() {
		let elems = [];

		for (let i = 0; i < this.state.list.length; i++) {
			let elem;

			if (this.props.type === "color") {
				elem = <div className="color-bar" style={{background: this.state.list[i]}} />;
			} else if (this.props.type === "input") {
				elem = (
					<input type="text" onChange={e => {
						e.persist();

						this.modifyItem(i, e.target.value);
					}} value={this.state.list[i]} />
				);
			}

			elems.push(
				<div key={this.keyList[i]} className="list-view-item">
					{elem}
					<button onClick={e => {
						e.preventDefault();

						this.removeItem(i);
					}} title="Remove">x</button>
				</div>
			);
		}

		elems.push(
			<div key="add-item" className="list-view-item">
				<input placeholder="New item..." type="text" value={this.state.itemToAdd} onChange={e => {
					this.setState({itemToAdd: e.target.value});
				}} />
				<button onClick={e => {
					e.preventDefault();

					this.addItem();
				}} title="Append">+</button>
			</div>
		);

		return <div className="list-view">{elems}</div>;		
	}
}


class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.btnCreateElem = null;
		this.btnExportElem = null;
		this.inputFileElem = null;

		this.state = {
			config: Sidebar.cloneConfig(defaultConfig),
			editorGridCreated: false
		};
	}

	static cloneConfig(o) {
		return JSON.parse(JSON.stringify(o));
	}

	componentDidMount() {
		this.btnExportElem.setAttribute("disabled", "disabled");

		this.inputFileElem.addEventListener("change", (e) => {
			const file = e.target.files[0];

			e.target.value = "";

			if (!file) {
				return;
			}

			if (file.type !== "text/javascript") {
				alert("Require a '.js' file.");

				return;
			}

			if (this.state.editorGridCreated && !window.confirm("Current creation will be discarded and CANNOT be found anymore if you haven't exported and saved it. Do you want to continue?")) {
				return;
			}

			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = e => {
				let conf = window.eval("(function () { " + e.target.result + " return config; })()");

				this.setState({
					config: normalizeConfig(conf)
				});

				this.createEditorGrid();
			};
			reader.onerror = () => {
				alert("Aww...Error on reading the selected config file occured.");
			};
		});
	}

	createEditorGrid() {
		this.setState({
			editorGridCreated: true
		});

		this.btnCreateElem.setAttribute("disabled", "disabled");
		this.btnExportElem.removeAttribute("disabled");

		this.props.onCreateEditorGrid(
			this.state.config.stageW, this.state.config.stageH,
			this.state.config.col, this.state.config.row, this.state.config.matrix
		);
	}

	onBtnOpenClicked() {
		this.inputFileElem.click();
	}

	onFormInputsChanged(e) {
		this.setState((prev, props) => {
			prev.config[e.target.id] = e.target.value;

			return {
				config: prev.config
			};
		});
	}

	getFormConfig() {
		return Sidebar.cloneConfig(this.state.config);
	}

	render() {
		let formList = [];

		for (let k in this.state.config) {
			if (k === "matrix") {
				continue;
			}

			let widget;

			const isInputEnabled = this.state.editorGridCreated && (k === "stageW" || k === "stageH" || k === "col" || k === "row");
			
			if (k === "colorList") {
				widget = <ListView type="color" list={this.state.config[k]} />;
			} else if (k === "preface") {
				widget = <ListView type="input" list={this.state.config[k]} />;
			} else {
				widget = (
					<input
						id={k} type="text" value={this.state.config[k]}
						onChange={e => {
							e.persist();

							this.onFormInputsChanged(e);
						}}
						readOnly={isInputEnabled} style={isInputEnabled ? {color: "#AAAAAA"} : null}
					/>
				);
			}

			formList.push(
				<div className="form-item" key={k}>
					<label>{k}<small>{isInputEnabled ? " [Locked]" : ""}</small></label>
					{widget}
				</div>
			);
		}

		return (
			<div id="sidebar">
				<div id="menu-box">
					<button id="menu-btn-create"
						ref={ele => this.btnCreateElem = ele}
						onClick={this.createEditorGrid.bind(this)}
					>Create</button>
					<button id="menu-btn-open"
						onClick = {this.onBtnOpenClicked.bind(this)}
					>Open</button>
					<button id="menu-btn-export"
						ref={ele => this.btnExportElem = ele}
						onClick={this.props.onExportConfig}
					>Export</button>
					<input id="menu-input-choose-file" ref={ele => this.inputFileElem = ele} type="file" />
				</div>

				<form id="form-box">
					{formList}
				</form>
			</div>
		);
	}
}


export default Sidebar;
