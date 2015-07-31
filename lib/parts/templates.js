(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function s(t,e){if(1===arguments.length){for(var r=t[0],a=1;a<t.length;a++)r=s(r,t[a]);return r}var i=t["class"],o=e["class"];(i||o)&&(i=i||[],o=o||[],Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),t["class"]=i.concat(o).filter(n));for(var f in e)"class"!=f&&(t[f]=e[f]);return t},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function f(n,t,e,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&t||r))throw n.message+=" on line "+e,n;try{r=r||require("fs").readFileSync(t,"utf8")}catch(a){f(n,null,e)}var i=3,o=r.split("\n"),s=Math.max(e-i,0),l=Math.min(o.length,e+i),i=o.slice(s,l).map(function(n,t){var r=t+s+1;return(r==e?"  > ":"    ")+r+"| "+n}).join("\n");throw n.path=t,n.message=(t||"Jade")+":"+e+"\n"+i+"\n\n"+n.message,n},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};
    templatizer["mixins"] = {};

    // contentTypes.jade compiled template
    templatizer["contentTypes"] = function tmpl_contentTypes(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(defaults, ns, overrides, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types' + jade.attr("xmlns", ns.contentTypes, true, false) + ">");
            (function() {
                var $obj = defaults;
                if ("number" == typeof $obj.length) {
                    for (var ext = 0, $l = $obj.length; ext < $l; ext++) {
                        var type = $obj[ext];
                        buf.push("<Default" + jade.attr("ContentType", type, true, false) + jade.attr("Extension", ext, true, false) + "></Default>");
                    }
                } else {
                    var $l = 0;
                    for (var ext in $obj) {
                        $l++;
                        var type = $obj[ext];
                        buf.push("<Default" + jade.attr("ContentType", type, true, false) + jade.attr("Extension", ext, true, false) + "></Default>");
                    }
                }
            }).call(this);
            (function() {
                var $obj = overrides;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var item = $obj[$index];
                        buf.push("<Override" + jade.attr("ContentType", item.type, true, false) + jade.attr("PartName", item.path, true, false) + "></Override>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var item = $obj[$index];
                        buf.push("<Override" + jade.attr("ContentType", item.type, true, false) + jade.attr("PartName", item.path, true, false) + "></Override>");
                    }
                }
            }).call(this);
            buf.push("</Types>");
        }).call(this, "defaults" in locals_for_with ? locals_for_with.defaults : typeof defaults !== "undefined" ? defaults : undefined, "ns" in locals_for_with ? locals_for_with.ns : typeof ns !== "undefined" ? ns : undefined, "overrides" in locals_for_with ? locals_for_with.overrides : typeof overrides !== "undefined" ? overrides : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // core.jade compiled template
    templatizer["core"] = function tmpl_core(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(Date, created, creator, ns, ts) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties' + jade.attrs(jade.merge([ ns.getAttributes([ "cp", "dc", "dcmitype", "dcterms", "xsi" ]) ]), false) + ">");
            creator = creator || "Excellent";
            buf.push("<dc:creator>" + jade.escape((jade_interp = creator) == null ? "" : jade_interp) + "</dc:creator><cp:lastModifiedBy>" + jade.escape((jade_interp = creator) == null ? "" : jade_interp) + "</cp:lastModifiedBy>");
            ts = created || Date.toISOString();
            buf.push('<dcterms:created xsi:type="dcterms:W3CDTF">' + jade.escape((jade_interp = ts) == null ? "" : jade_interp) + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + jade.escape((jade_interp = ts) == null ? "" : jade_interp) + "</dcterms:modified></cp:coreProperties>");
        }).call(this, "Date" in locals_for_with ? locals_for_with.Date : typeof Date !== "undefined" ? Date : undefined, "created" in locals_for_with ? locals_for_with.created : typeof created !== "undefined" ? created : undefined, "creator" in locals_for_with ? locals_for_with.creator : typeof creator !== "undefined" ? creator : undefined, "ns" in locals_for_with ? locals_for_with.ns : typeof ns !== "undefined" ? ns : undefined, "ts" in locals_for_with ? locals_for_with.ts : typeof ts !== "undefined" ? ts : undefined);
        return buf.join("");
    };

    // image.jade compiled template
    templatizer["image"] = function tmpl_image(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // mixins/attrTags.jade compiled template
    templatizer["mixins"]["attrTags"] = function tmpl_mixins_attrTags(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var attrTags = {
            bold: "b",
            italic: "i",
            underline: "u",
            strike: "strike"
        };
        return buf.join("");
    };

    // mixins/namespaces.jade compiled template
    templatizer["mixins"]["namespaces"] = function tmpl_mixins_namespaces(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // rels.jade compiled template
    templatizer["rels"] = function tmpl_rels(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(ns, relationships, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships' + jade.attr("xmlns", ns.relationships, true, false) + ">");
            (function() {
                var $obj = relationships;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var rel = $obj[$index];
                        buf.push("<Relationship" + jade.attr("Id", rel.id, true, false) + jade.attr("Target", rel.target, true, false) + jade.attr("Type", rel.type, true, false) + jade.attr("TargetMode", rel.targetMode, true, false) + "/>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var rel = $obj[$index];
                        buf.push("<Relationship" + jade.attr("Id", rel.id, true, false) + jade.attr("Target", rel.target, true, false) + jade.attr("Type", rel.type, true, false) + jade.attr("TargetMode", rel.targetMode, true, false) + "/>");
                    }
                }
            }).call(this);
            buf.push("</Relationships>");
        }).call(this, "ns" in locals_for_with ? locals_for_with.ns : typeof ns !== "undefined" ? ns : undefined, "relationships" in locals_for_with ? locals_for_with.relationships : typeof relationships !== "undefined" ? relationships : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // sharedStrings.jade compiled template
    templatizer["sharedStrings"] = function tmpl_sharedStrings(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(ns, stringCellCount, undefined, uniqueStrings) {
            var attrTags = {
                bold: "b",
                italic: "i",
                underline: "u",
                strike: "strike"
            };
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst' + jade.attr("count", stringCellCount, true, false) + jade.attr("uniqueCount", uniqueStrings.length, true, false) + jade.attr("xmlns", ns.spreadsheetml, true, false) + ">");
            (function() {
                var $obj = uniqueStrings;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var string = $obj[$index];
                        buf.push("<si>");
                        if (typeof string === "string") {
                            buf.push("<t>" + jade.escape((jade_interp = string) == null ? "" : jade_interp) + "</t>");
                        } else {
                            (function() {
                                var $obj = string;
                                if ("number" == typeof $obj.length) {
                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                        var part = $obj[$index];
                                        buf.push("<r>");
                                        if (typeof part === "string") {
                                            buf.push("<t" + jade.attr("xml:space", part.indexOf(" ") !== -1 ? "preserve" : void 0, true, false) + ">" + jade.escape((jade_interp = part) == null ? "" : jade_interp) + "</t>");
                                        } else {
                                            buf.push("<rPr>");
                                            buf.push(templatizer["sharedStrings"]["richTextStyle"](part.style));
                                            buf.push("</rPr><t>" + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                        }
                                        buf.push("</r>");
                                    }
                                } else {
                                    var $l = 0;
                                    for (var $index in $obj) {
                                        $l++;
                                        var part = $obj[$index];
                                        buf.push("<r>");
                                        if (typeof part === "string") {
                                            buf.push("<t" + jade.attr("xml:space", part.indexOf(" ") !== -1 ? "preserve" : void 0, true, false) + ">" + jade.escape((jade_interp = part) == null ? "" : jade_interp) + "</t>");
                                        } else {
                                            buf.push("<rPr>");
                                            buf.push(templatizer["sharedStrings"]["richTextStyle"](part.style));
                                            buf.push("</rPr><t>" + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                        }
                                        buf.push("</r>");
                                    }
                                }
                            }).call(this);
                        }
                        buf.push("</si>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var string = $obj[$index];
                        buf.push("<si>");
                        if (typeof string === "string") {
                            buf.push("<t>" + jade.escape((jade_interp = string) == null ? "" : jade_interp) + "</t>");
                        } else {
                            (function() {
                                var $obj = string;
                                if ("number" == typeof $obj.length) {
                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                        var part = $obj[$index];
                                        buf.push("<r>");
                                        if (typeof part === "string") {
                                            buf.push("<t" + jade.attr("xml:space", part.indexOf(" ") !== -1 ? "preserve" : void 0, true, false) + ">" + jade.escape((jade_interp = part) == null ? "" : jade_interp) + "</t>");
                                        } else {
                                            buf.push("<rPr>");
                                            buf.push(templatizer["sharedStrings"]["richTextStyle"](part.style));
                                            buf.push("</rPr><t>" + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                        }
                                        buf.push("</r>");
                                    }
                                } else {
                                    var $l = 0;
                                    for (var $index in $obj) {
                                        $l++;
                                        var part = $obj[$index];
                                        buf.push("<r>");
                                        if (typeof part === "string") {
                                            buf.push("<t" + jade.attr("xml:space", part.indexOf(" ") !== -1 ? "preserve" : void 0, true, false) + ">" + jade.escape((jade_interp = part) == null ? "" : jade_interp) + "</t>");
                                        } else {
                                            buf.push("<rPr>");
                                            buf.push(templatizer["sharedStrings"]["richTextStyle"](part.style));
                                            buf.push("</rPr><t>" + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                        }
                                        buf.push("</r>");
                                    }
                                }
                            }).call(this);
                        }
                        buf.push("</si>");
                    }
                }
            }).call(this);
            buf.push("</sst>");
        }).call(this, "ns" in locals_for_with ? locals_for_with.ns : typeof ns !== "undefined" ? ns : undefined, "stringCellCount" in locals_for_with ? locals_for_with.stringCellCount : typeof stringCellCount !== "undefined" ? stringCellCount : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined, "uniqueStrings" in locals_for_with ? locals_for_with.uniqueStrings : typeof uniqueStrings !== "undefined" ? uniqueStrings : undefined);
        return buf.join("");
    };

    // sharedStrings.jade:attrTags compiled template
    templatizer["sharedStrings"]["attrTags"] = function tmpl_sharedStrings_attrTags(style) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        (function() {
            var $obj = attrTags;
            if ("number" == typeof $obj.length) {
                for (var attr = 0, $l = $obj.length; attr < $l; attr++) {
                    var tag = $obj[attr];
                    if (style[attr]) {
                        buf.push("<" + tag + "/>");
                    }
                }
            } else {
                var $l = 0;
                for (var attr in $obj) {
                    $l++;
                    var tag = $obj[attr];
                    if (style[attr]) {
                        buf.push("<" + tag + "/>");
                    }
                }
            }
        }).call(this);
        return buf.join("");
    };


    // sharedStrings.jade:richTextStyle compiled template
    templatizer["sharedStrings"]["richTextStyle"] = function tmpl_sharedStrings_richTextStyle(style) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push(templatizer["sharedStrings"]["attrTags"](style));
        if (style.size) {
            buf.push("<sz" + jade.attr("val", style.size, true, false) + "></sz>");
        }
        buf.push("<color" + jade.attrs(jade.merge([ style.color || {
            rgb: "FF000000"
        } ]), false) + "></color><rFont" + jade.attr("val", style.font || "Calibri", true, false) + "></rFont><family" + jade.attr("val", style.family || 2, true, false) + "></family><scheme" + jade.attr("val", style.scheme || "minor", true, false) + "></scheme>");
        return buf.join("");
    };

    // workbook.jade compiled template
    templatizer["workbook"] = function tmpl_workbook(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(ns, sheets, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook' + jade.attrs(jade.merge([ ns.getAttributes({
                spreadsheetml: "__main",
                relationships: "r"
            }) ]), false) + "><sheets>");
            (function() {
                var $obj = sheets;
                if ("number" == typeof $obj.length) {
                    for (var i = 0, $l = $obj.length; i < $l; i++) {
                        var sheet = $obj[i];
                        var id = ++i;
                        buf.push("<sheet" + jade.attr("name", sheet.name, true, false) + jade.attr("r:id", "rId" + id, true, false) + jade.attr("sheetId", id, true, false) + "/>");
                    }
                } else {
                    var $l = 0;
                    for (var i in $obj) {
                        $l++;
                        var sheet = $obj[i];
                        var id = ++i;
                        buf.push("<sheet" + jade.attr("name", sheet.name, true, false) + jade.attr("r:id", "rId" + id, true, false) + jade.attr("sheetId", id, true, false) + "/>");
                    }
                }
            }).call(this);
            buf.push("</sheets></workbook>");
        }).call(this, "ns" in locals_for_with ? locals_for_with.ns : typeof ns !== "undefined" ? ns : undefined, "sheets" in locals_for_with ? locals_for_with.sheets : typeof sheets !== "undefined" ? sheets : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // worksheet.jade compiled template
    templatizer["worksheet"] = function tmpl_worksheet(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(cols, dimension, hyperlinks, merges, panes, rows, selection, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
            var ns = ns.getAttributes({
                spreadsheetml: "__main",
                markupCompatibility: "mc",
                relationships: "r",
                x14ac: "x14ac"
            });
            buf.push("<worksheet" + jade.attrs(jade.merge([ {
                "mc:Ignorable": "x14ac"
            }, ns ]), false) + "><dimension" + jade.attr("ref", dimension, true, false) + '/><sheetViews><sheetView tabSelected="1" workbookViewId="0">');
            if (locals.panes && panes.length) {
                (function() {
                    var $obj = panes;
                    if ("number" == typeof $obj.length) {
                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                            var pane = $obj[$index];
                            buf.push("<pane" + jade.attrs(jade.merge([ pane ]), false) + "></pane>");
                        }
                    } else {
                        var $l = 0;
                        for (var $index in $obj) {
                            $l++;
                            var pane = $obj[$index];
                            buf.push("<pane" + jade.attrs(jade.merge([ pane ]), false) + "></pane>");
                        }
                    }
                }).call(this);
            }
            if (locals.selection) {
                buf.push("<selection" + jade.attrs(jade.merge([ selection ]), false) + "></selection>");
            }
            buf.push('</sheetView></sheetViews><sheetFormatPr baseColWidth="10" defaultRowHeight="15" x14ac:dyDescent="0"></sheetFormatPr>');
            if (locals.cols && cols.length) {
                buf.push("<cols>");
                (function() {
                    var $obj = cols;
                    if ("number" == typeof $obj.length) {
                        for (var i = 0, $l = $obj.length; i < $l; i++) {
                            var col = $obj[i];
                            buf.push('<col customWidth="1"' + jade.attr("max", col.column || i + 1, true, false) + jade.attr("width", col.width, true, false) + "/>");
                        }
                    } else {
                        var $l = 0;
                        for (var i in $obj) {
                            $l++;
                            var col = $obj[i];
                            buf.push('<col customWidth="1"' + jade.attr("max", col.column || i + 1, true, false) + jade.attr("width", col.width, true, false) + "/>");
                        }
                    }
                }).call(this);
                buf.push("</cols>");
            }
            if (locals.rows && rows.length) {
                buf.push("<sheetData>");
                (function() {
                    var $obj = rows;
                    if ("number" == typeof $obj.length) {
                        for (var i = 0, $l = $obj.length; i < $l; i++) {
                            var row = $obj[i];
                            buf.push("<row" + jade.attr("r", i + 1, true, false) + ">");
                            (function() {
                                var $obj = row.cells;
                                if ("number" == typeof $obj.length) {
                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                        var cell = $obj[$index];
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if (cell.formula) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        buf.push("</c>");
                                    }
                                } else {
                                    var $l = 0;
                                    for (var $index in $obj) {
                                        $l++;
                                        var cell = $obj[$index];
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if (cell.formula) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        buf.push("</c>");
                                    }
                                }
                            }).call(this);
                            buf.push("</row>");
                        }
                    } else {
                        var $l = 0;
                        for (var i in $obj) {
                            $l++;
                            var row = $obj[i];
                            buf.push("<row" + jade.attr("r", i + 1, true, false) + ">");
                            (function() {
                                var $obj = row.cells;
                                if ("number" == typeof $obj.length) {
                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                        var cell = $obj[$index];
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if (cell.formula) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        buf.push("</c>");
                                    }
                                } else {
                                    var $l = 0;
                                    for (var $index in $obj) {
                                        $l++;
                                        var cell = $obj[$index];
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if (cell.formula) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        buf.push("</c>");
                                    }
                                }
                            }).call(this);
                            buf.push("</row>");
                        }
                    }
                }).call(this);
                buf.push("</sheetData>");
            } else {
                buf.push("<sheetData/>");
            }
            if (locals.merges && merges.length) {
                buf.push("<mergeCells>");
                (function() {
                    var $obj = merges;
                    if ("number" == typeof $obj.length) {
                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                            var merge = $obj[$index];
                            buf.push("<mergeCell" + jade.attr("ref", merge, true, false) + "/>");
                        }
                    } else {
                        var $l = 0;
                        for (var $index in $obj) {
                            $l++;
                            var merge = $obj[$index];
                            buf.push("<mergeCell" + jade.attr("ref", merge, true, false) + "/>");
                        }
                    }
                }).call(this);
                buf.push("</mergeCells>");
            }
            buf.push("<phoneticPr" + jade.attrs(jade.merge([ {
                fontId: 1,
                type: "noConversion"
            }, locals.phoneticPr || {} ]), false) + "></phoneticPr>");
            if (locals.hyperlinks && hyperlinks.length) {
                buf.push("<hyperlinks>");
                (function() {
                    var $obj = hyperlinks;
                    if ("number" == typeof $obj.length) {
                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                            var hyperlink = $obj[$index];
                            buf.push("<hyperlink" + jade.attr("r:id", hyperlink.id, true, false) + jade.attr("ref", hyperlink.ref, true, false) + jade.attr("tooltip", hyperlink.tooltip, true, false) + "/>");
                        }
                    } else {
                        var $l = 0;
                        for (var $index in $obj) {
                            $l++;
                            var hyperlink = $obj[$index];
                            buf.push("<hyperlink" + jade.attr("r:id", hyperlink.id, true, false) + jade.attr("ref", hyperlink.ref, true, false) + jade.attr("tooltip", hyperlink.tooltip, true, false) + "/>");
                        }
                    }
                }).call(this);
                buf.push("</hyperlinks>");
            }
            buf.push("<pageMargins" + jade.attrs(jade.merge([ {
                bottom: 1,
                footer: .5,
                header: .5,
                left: 1,
                right: 1,
                top: 1
            }, locals.pageMargins || {} ]), false) + "/><pageSetup" + jade.attrs(jade.merge([ {
                fitToWidth: 1,
                fitToHeight: 1e3
            }, locals.pageSetup || {} ]), false) + "/>");
            if (locals.headers || locals.footers) {
                var headers = locals.headers || {};
                var footers = locals.footers || {};
                buf.push("<headerFooter>");
                if (headers.odd) {
                    buf.push("<oddHeader>" + jade.escape((jade_interp = headers.odd) == null ? "" : jade_interp) + "</oddHeader>");
                }
                if (footers.odd) {
                    buf.push("<oddFooter>" + jade.escape((jade_interp = footers.odd) == null ? "" : jade_interp) + "</oddFooter>");
                }
                if (headers.even) {
                    buf.push("<evenHeader>" + jade.escape((jade_interp = headers.even) == null ? "" : jade_interp) + "</evenHeader>");
                }
                if (footers.even) {
                    buf.push("<evenFooter>" + jade.escape((jade_interp = footers.even) == null ? "" : jade_interp) + "</evenFooter>");
                }
                if (headers.first) {
                    buf.push("<firstHeader>" + jade.escape((jade_interp = headers.first) == null ? "" : jade_interp) + "</firstHeader>");
                }
                if (footers.first) {
                    buf.push("<firstFooter>" + jade.escape((jade_interp = footers.first) == null ? "" : jade_interp) + "</firstFooter>");
                }
                buf.push("</headerFooter>");
            }
            buf.push("</worksheet>");
        }).call(this, "cols" in locals_for_with ? locals_for_with.cols : typeof cols !== "undefined" ? cols : undefined, "dimension" in locals_for_with ? locals_for_with.dimension : typeof dimension !== "undefined" ? dimension : undefined, "hyperlinks" in locals_for_with ? locals_for_with.hyperlinks : typeof hyperlinks !== "undefined" ? hyperlinks : undefined, "merges" in locals_for_with ? locals_for_with.merges : typeof merges !== "undefined" ? merges : undefined, "panes" in locals_for_with ? locals_for_with.panes : typeof panes !== "undefined" ? panes : undefined, "rows" in locals_for_with ? locals_for_with.rows : typeof rows !== "undefined" ? rows : undefined, "selection" in locals_for_with ? locals_for_with.selection : typeof selection !== "undefined" ? selection : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    return templatizer;
}));
