import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
// import {observer, PropTypes as MobxPropTypes} from "mobx-react";
// 
// import SidebarList from "./list";
// import SidebarSearchInput from "./search-input";

class Sidebar extends React.Component {
  static propTypes = {
    content: PropTypes.array,
    location: PropTypes.object,
    toc: PropTypes.string
  };
  
  // store: PropTypes.shape({
  //   searchText: PropTypes.string.isRequired,
  //   searchIndex: PropTypes.array.isRequired,
  //   sidebarContent: MobxPropTypes.observableArray.isRequired,
  //   sidebarMatchingNodes: PropTypes.object.isRequired
  // }).isRequired,

  // <div className="Sidebar-Search">
  //   <SidebarSearchInput store={this.props.store} />
  // </div>
  // <SidebarList
  //   content={this.props.store.sidebarContent}
  //   matchingNodes={this.props.store.sidebarMatchingNodes}
  //   isSearching={!!this.props.store.searchText}
  //   location={this.props.location}
  // />

  renderLinksList(edges, type, category) {
    const { location, toc } = this.props;

    let filteredEdges = edges.filter(edge => {
      return edge.node.fields.type === type;
    });
    
    if (category) {
      filteredEdges = filteredEdges.filter(edge => {
        return edge.node.frontmatter.category === category;
      });
    }
    
    console.log('filteredEdges', filteredEdges);
    
    const renderList = filteredEdges.sort((edge1, edge2) => {
      const title1 = edge1.node.frontmatter.title; 
      const title2 = edge2.node.frontmatter.title;
      return title1.localeCompare(title2);
    }).map(edge => {
      const link = edge.node;
      const isActive = category !== "introduction" && location.pathname === link.fields.slug ? true : false;
      return (
        <li className="Sidebar-List-Item" key={link.fields.slug}>
          <Link to={link.fields.slug} activeClassName="is-active">
            {link.frontmatter.title}
          </Link>
          {isActive ? <div className="Sidebar-toc" dangerouslySetInnerHTML={{__html: toc}} /> : null}
        </li>
      );
    });
    
    return renderList;
  }

  render() {
    const { content, location, toc } = this.props;
    
    /* eslint-disable max-len */
    return (
      <nav className="Sidebar">
        <div className="Sidebar-Grid">
          <p className="Sidebar-Heading u-noPadding">
            Introduction
          </p>
          <ul className="Sidebar-List">
            <ul className="Sidebar-List">
              {this.renderLinksList(content, "docs", "introduction")}
            </ul>
          </ul>
          <div className="Sidebar-Grid-block">
            <p className="Sidebar-Heading">Guides</p>
            <ul className="Sidebar-List">
              {this.renderLinksList(content, "guides", null)}
            </ul>
          </div>
          <div className="Sidebar-Grid-block">
            <p className="Sidebar-Heading">Documentation</p>
            <ul className="Sidebar-List">
              {this.renderLinksList(content, "docs", "none")}
            </ul>
            <p className="Sidebar-SubHeading SubHeading">Chart</p>
            <ul className="Sidebar-List">
              {this.renderLinksList(content, "docs", "chart")}
            </ul>
          </div>
        </div>
      </nav>
    );
  /* eslint-enable max-len */
  }
}

// export default observer(Sidebar);
export default Sidebar;