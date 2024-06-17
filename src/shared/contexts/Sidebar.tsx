import React, { Component, createContext, ReactNode } from "react";

type SidebarContextObj = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextObj>({
  isOpen: true,
  toggleSidebar: () => {},
});


interface SidebarContextProviderProps {
  children: ReactNode;
}

interface SidebarContextProviderState {
  isOpen: boolean;
}

class SidebarContextProvider extends Component<
  SidebarContextProviderProps,
  SidebarContextProviderState
> {
  constructor(props: SidebarContextProviderProps) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  toggleSidebar = () => {
    
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const contextValue: SidebarContextObj = {
      isOpen: this.state.isOpen,
      toggleSidebar: this.toggleSidebar,
    };

    return (
      <SidebarContext.Provider value={contextValue}>
        {this.props.children}
      </SidebarContext.Provider>
    );
  }
}

export { SidebarContextProvider };
export default SidebarContext;
