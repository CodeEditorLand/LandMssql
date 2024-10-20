/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ReactNode, createContext } from "react";
import * as ep from "./executionPlanInterfaces";
import { useVscodeWebview } from "../../common/vscodeWebviewProvider";
import { Theme } from "@fluentui/react-components";

export interface ExecutionPlanState {
    provider: ep.ExecutionPlanProvider;
    state: ep.ExecutionPlanWebviewState;
    theme: Theme;
}

const ExecutionPlanContext = createContext<ExecutionPlanState | undefined>(
    undefined,
);

interface ExecutionPlanContextProps {
    children: ReactNode;
}

const ExecutionPlanStateProvider: React.FC<ExecutionPlanContextProps> = ({
    children,
}) => {
    const webviewState = useVscodeWebview<
        ep.ExecutionPlanWebviewState,
        ep.ExecutionPlanReducers
    >();
    return (
        <ExecutionPlanContext.Provider
            value={{
                provider: {
                    getExecutionPlan: function (
                        planFile: ep.ExecutionPlanGraphInfo,
                    ): void {
                        webviewState?.extensionRpc.action("getExecutionPlan", {
                            sqlPlanContent: planFile.graphFileContent,
                        });
                    },
                    saveExecutionPlan: function (sqlPlanContent: string): void {
                        webviewState?.extensionRpc.action("saveExecutionPlan", {
                            sqlPlanContent: sqlPlanContent,
                        });
                    },
                    showPlanXml: function (sqlPlanContent: string): void {
                        webviewState?.extensionRpc.action("showPlanXml", {
                            sqlPlanContent: sqlPlanContent,
                        });
                    },
                    showQuery: function (query: string): void {
                        webviewState?.extensionRpc.action("showQuery", {
                            query: query,
                        });
                    },
                    updateTotalCost: function (addedCost: number): void {
                        webviewState?.extensionRpc.action("updateTotalCost", {
                            addedCost: addedCost,
                        });
                    },
                },
                state: webviewState?.state as ep.ExecutionPlanWebviewState,
                theme: webviewState?.theme,
            }}
        >
            {children}
        </ExecutionPlanContext.Provider>
    );
};

export { ExecutionPlanContext, ExecutionPlanStateProvider };
