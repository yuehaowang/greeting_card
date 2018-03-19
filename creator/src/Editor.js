import React from "react";
import "./Editor.css";


class Hint extends React.Component {
	render() {
		return (
			<div id="editor">
				<div id="hint">
					<h1>Welcome to <i>Greeting Card Creator</i></h1>
					<div>
						<p>To make your own greeting cards, follow this:</p>
						<ul>
							<li>Click the 'Create' button to create a config file.</li>
							<li>Click the 'Open' button to open an existing config file.</li>
							<li>Click the 'Export' button to get the content of the current config file.</li>
						</ul>
					</div>
					<div>
						<p>Notes:</p>
						<ul>
							<li>The moment you click the 'Create' button or open an existing config file, settings on <i>stageW</i>, <i>stageH</i>, <i>col</i> and <i>row</i> will be locked (i.e. you cannot modify them anymore).</li>
							<li>A large grid containing too many cells may significantly slow down the rumtime performance.</li>
						</ul>
					</div>
					<p>&copy; 2018 Yuehao Wang. <a href={"mailto:wangyuehao1999@gmail.com"}>Comments</a> are welcomed.</p>
				</div>
			</div>
		);
	}
}


class Cell extends React.Component {
	render() {
		return (
			<div className="cell"
				style={{
					width: this.props.width,
					height: this.props.height,
					background: (this.props.checked ? "#666666" : "#F1F1F1")
				}}

				onClick = {e => {
					this.props.onClick(this.props.x, this.props.y);
				}}
			/>
		);
	}
}


class Toolbar extends React.Component {
	render() {
		return (
			<div id="toolbar">
				<button onClick={this.props.onBtnUndoClicked}>Undo</button>
				<button onClick={this.props.onBtnResetClicked}>Reset</button>
				<button onClick={this.props.onBtnInverseClicked}>Inverse</button>
			</div>
		);
	}
}


class Grid extends React.Component {
	constructor(props) {
		super(props);

		this.matrixHistory = [];

		this.state = {
			matrix: Grid.getMatrix(this.props)
		};
	}

	static getMatrix(props) {
		return props.matrix ? props.matrix : Grid.getInitMatrix(props.row, props.col);
	}

	static getInitMatrix(row, col) {
		return (Array(row).fill(0)).map(() => Array(col).fill(false));
	}

	static cloneMatrix(o) {
		return o.map(row => {
			return row.map(item => item);
		});
	}

	componentWillReceiveProps(nextProps) {
		this.matrixHistory.splice(0, this.matrixHistory.length);

		this.setState({
			matrix: Grid.getMatrix(nextProps)
		});
	}

	getMatrixConfig() {
		return Grid.cloneMatrix(this.state.matrix);
	}

	onCellClicked(x, y) {
		this.pushMatrixHistory();

		this.setState((prev, props) => {
			prev.matrix[y][x] = !prev.matrix[y][x];

			return {
				matrix: prev.matrix
			};
		});
	}

	undo() {
		if (this.matrixHistory.length <= 0) {
			return;
		}

		this.setState({
			matrix: this.matrixHistory.pop()
		});
	}

	inverse() {
		this.pushMatrixHistory();

		this.setState((prev, props) => {
			prev.matrix.forEach((row, y) => row.forEach((val, x) => row[x] = !val));

			return {
				matrix: prev.matrix
			};
		});
	}

	reset() {
		this.pushMatrixHistory();

		this.setState({
			matrix: Grid.getInitMatrix(this.props.row, this.props.col)
		});
	}

	pushMatrixHistory() {
		this.matrixHistory.push(Grid.cloneMatrix(this.state.matrix));

		if (this.matrixHistory.length > 10) {
			this.matrixHistory.shift();
		}
	}

	render() {
		return (
			<div id="grid">
				{this.state.matrix.map((row, y) =>{
					return (
						<div key={"row_" + y} className="row">
							{row.map((val, x) => {
								return (
									<Cell
										checked={val}
										x={x} y={y}
										key={"cell_(" + x + ", " + y + ")"}
										width={this.props.cellW}
										height={this.props.cellH}
										onClick = {this.onCellClicked.bind(this)}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}


class Editor extends React.Component {
	constructor() {
		super();

		this.state = {
			gridCreated: false
		};

		this.gridInfo = {
			cellW: 0,
			cellH: 0,
			col: 0,
			row: 0
		};

		this.gridElem = null;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.gridCreated === this.state.gridCreated) {
			return false;
		}

		return true;
	}

	createGrid(stageW, stageH, col, row, matrix) {
		col = Math.round(col);
		row = Math.round(row);

		this.gridInfo = {
			cellW: stageW / (col > 0 ? col : 1),
			cellH: stageH / (row > 0 ? row : 1),
			col: col,
			row: row,
			matrix: matrix
		};

		if (this.state.gridCreated) {
			this.forceUpdate();
		} else {
			this.setState({
				gridCreated: true
			});
		}
	}

	render() {
		let widget;

		if (!this.state.gridCreated) {
			widget = <Hint />;
		} else {
			widget = <Grid ref={ele => this.gridElem = ele} matrix={this.gridInfo.matrix} col={this.gridInfo.col} row={this.gridInfo.row} cellW={this.gridInfo.cellW} cellH={this.gridInfo.cellH} />;
		}

		return (
			<div id="editor">
				{widget}

				{this.state.gridCreated ? (
					<Toolbar
						onBtnUndoClicked={() => {
							if (this.gridElem != null) {
								this.gridElem.undo();
							}
						}}
						onBtnResetClicked={() => {
							if (this.gridElem != null) {
								this.gridElem.reset();
							}
						}}
						onBtnInverseClicked={() => {
							if (this.gridElem != null) {
								this.gridElem.inverse();
							}
						}}
					/> 
				) : null}
			</div>
		);
	}
}


export default Editor;
