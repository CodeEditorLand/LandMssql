/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import ReactDOM from "react-dom/client";

import "../../index.css";

import { VscodeWebviewProvider } from "../../common/vscodeWebviewProvider";
import { TableDesigner } from "./tableDesignerPage";
import { TableDesignerStateProvider } from "./tableDesignerStateProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<VscodeWebviewProvider>
		<TableDesignerStateProvider>
			<TableDesigner />
		</TableDesignerStateProvider>
	</VscodeWebviewProvider>,
);
