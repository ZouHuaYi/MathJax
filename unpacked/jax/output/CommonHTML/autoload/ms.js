/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/jax/output/CommonHTML/autoload/ms.js
 *  
 *  Implements the CommonHTML output for <ms> elements.
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2015 The MathJax Consortium
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Hub.Register.StartupHook("CommonHTML Jax Ready",function () {
  var VERSION = "2.5.0";
  var MML = MathJax.ElementJax.mml,
      CHTML = MathJax.OutputJax.CommonHTML;
  
  MML.ms.Augment({
    toCommonHTML: function (node) {
      //
      //  Create the node and handle its styles and scaling
      //  Get the variant and an empty bounding box
      //
      node = this.CHTMLcreateNode(node);
      this.CHTMLhandleStyle(node);
      this.CHTMLhandleScale(node);
      this.CHTMLgetVariant();
      CHTML.BBOX.empty(this.CHTML);
      //
      //  Get the quotes to use
      //
      var values = this.getValues("lquote","rquote");
      if (!this.hasValue("lquote")) values.lquote = "\u201C";
      if (!this.hasValue("rquote")) values.rquote = "\u201D";
      //
      //  Add the left quote, the child nodes, and the right quote
      //  FIXME:  should the quotation marks be in MML.VARIANT.NORMAL?
      //
      this.CHTMLhandleText(node,values.lquote,this.CHTMLvariant);
      for (var i = 0, m = this.data.length; i < m; i++) this.CHTMLaddChild(node,i,{});
      this.CHTMLhandleText(node,values.rquote,this.CHTMLvariant);
      //
      //  Finish the bbox, add any needed space and color
      //
      this.CHTML.clean();
      this.CHTMLhandleSpace(node);
      this.CHTMLhandleBBox(node);
      this.CHTMLhandleColor(node);
      //
      //  Return the completed node
      //
      return node;
    }
  });
  
  MathJax.Hub.Startup.signal.Post("CommonHTML ms Ready");
  MathJax.Ajax.loadComplete(CHTML.autoloadDir+"/ms.js");
});

