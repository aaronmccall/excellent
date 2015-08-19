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
        (function(defaults, namespaces, overrides, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types' + jade.attrs(jade.merge([ namespaces ]), false) + ">");
            (function() {
                var $obj = defaults;
                if ("number" == typeof $obj.length) {
                    for (var ext = 0, $l = $obj.length; ext < $l; ext++) {
                        var type = $obj[ext];
                        buf.push("<Default" + jade.attr("ContentType", type, true, false) + jade.attr("Extension", ext, true, false) + "/>");
                    }
                } else {
                    var $l = 0;
                    for (var ext in $obj) {
                        $l++;
                        var type = $obj[ext];
                        buf.push("<Default" + jade.attr("ContentType", type, true, false) + jade.attr("Extension", ext, true, false) + "/>");
                    }
                }
            }).call(this);
            (function() {
                var $obj = overrides;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var item = $obj[$index];
                        buf.push("<Override" + jade.attr("ContentType", item.type, true, false) + jade.attr("PartName", "/" + item.path, true, false) + "/>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var item = $obj[$index];
                        buf.push("<Override" + jade.attr("ContentType", item.type, true, false) + jade.attr("PartName", "/" + item.path, true, false) + "/>");
                    }
                }
            }).call(this);
            buf.push("</Types>");
        }).call(this, "defaults" in locals_for_with ? locals_for_with.defaults : typeof defaults !== "undefined" ? defaults : undefined, "namespaces" in locals_for_with ? locals_for_with.namespaces : typeof namespaces !== "undefined" ? namespaces : undefined, "overrides" in locals_for_with ? locals_for_with.overrides : typeof overrides !== "undefined" ? overrides : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // coreProperties.jade compiled template
    templatizer["coreProperties"] = function tmpl_coreProperties(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(Date, createdAt, creator, lastModified, lm, ns, ts) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties' + jade.attrs(jade.merge([ ns.getAttributes([ "cp", "dc", "dcmitype", "dcterms", "xsi" ]) ]), false) + ">");
            creator = creator || "Excellent";
            buf.push("<dc:creator>" + jade.escape((jade_interp = creator) == null ? "" : jade_interp) + "</dc:creator><cp:lastModifiedBy>" + jade.escape((jade_interp = creator) == null ? "" : jade_interp) + "</cp:lastModifiedBy>");
            ts = (createdAt && createdAt instanceof Date && createdAt || new Date()).toISOString();
            buf.push('<dcterms:created xsi:type="dcterms:W3CDTF">' + jade.escape((jade_interp = ts) == null ? "" : jade_interp) + "</dcterms:created>");
            lm = lastModified && lastModified instanceof Date && lastModified.toISOString() || ts;
            buf.push('<dcterms:modified xsi:type="dcterms:W3CDTF">' + jade.escape((jade_interp = ts) == null ? "" : jade_interp) + "</dcterms:modified></cp:coreProperties>");
        }).call(this, "Date" in locals_for_with ? locals_for_with.Date : typeof Date !== "undefined" ? Date : undefined, "createdAt" in locals_for_with ? locals_for_with.createdAt : typeof createdAt !== "undefined" ? createdAt : undefined, "creator" in locals_for_with ? locals_for_with.creator : typeof creator !== "undefined" ? creator : undefined, "lastModified" in locals_for_with ? locals_for_with.lastModified : typeof lastModified !== "undefined" ? lastModified : undefined, "lm" in locals_for_with ? locals_for_with.lm : typeof lm !== "undefined" ? lm : undefined, "ns" in locals_for_with ? locals_for_with.ns : typeof ns !== "undefined" ? ns : undefined, "ts" in locals_for_with ? locals_for_with.ts : typeof ts !== "undefined" ? ts : undefined);
        return buf.join("");
    };

    // image.jade compiled template
    templatizer["image"] = function tmpl_image(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(description, extent, filename, id, name, namespaces, ns, origin) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr' + jade.attrs(jade.merge([ namespaces ]), false) + "><xdr:absoluteAnchor><xdr:pos" + jade.attrs(jade.merge([ origin ]), false) + "/><xdr:ext" + jade.attrs(jade.merge([ extent ]), false) + "/><xdr:pic><xdr:nvPicPr><xdr:cNvPr" + jade.attr("descr", description || filename, true, false) + jade.attr("id", id, true, false) + jade.attr("name", name || "Picture 1", true, false) + '></xdr:cNvPr><xdr:cNvPicPr><a:picLocks noChangeAspect="1"></a:picLocks></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip' + jade.attr("r:embed", "rId" + id, true, false) + jade.attr("xmlns:r", ns.relationships, true, false) + '><a:extLst><a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}"><a14:useLocalDpi val="0" xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main"/></a:ext></a:extLst></a:blip><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off' + jade.attrs(jade.merge([ origin ]), false) + "/><a:ext" + jade.attrs(jade.merge([ extent ]), false) + '/></a:xfrm><a:prstGeom prst="rect"><a:avLst></a:avLst></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:absoluteAnchor></xdr:wsDr>');
        }).call(this, "description" in locals_for_with ? locals_for_with.description : typeof description !== "undefined" ? description : undefined, "extent" in locals_for_with ? locals_for_with.extent : typeof extent !== "undefined" ? extent : undefined, "filename" in locals_for_with ? locals_for_with.filename : typeof filename !== "undefined" ? filename : undefined, "id" in locals_for_with ? locals_for_with.id : typeof id !== "undefined" ? id : undefined, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "namespaces" in locals_for_with ? locals_for_with.namespaces : typeof namespaces !== "undefined" ? namespaces : undefined, "ns" in locals_for_with ? locals_for_with.ns : typeof ns !== "undefined" ? ns : undefined, "origin" in locals_for_with ? locals_for_with.origin : typeof origin !== "undefined" ? origin : undefined);
        return buf.join("");
    };

    // mixins/attrTags.jade compiled template
    templatizer["mixins"]["attrTags"] = function tmpl_mixins_attrTags(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        return buf.join("");
    };

    // mixins/attrTags.jade:attrTag compiled template
    templatizer["mixins"]["attrTags"]["attrTag"] = function tmpl_mixins_attrTags_attrTag(tag, attrs) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        if (typeof attrs === "object") {
            buf.push("<" + tag + ">/&attributes(attrs)</" + tag + ">");
        } else {
            buf.push("<" + tag + "/>");
        }
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
        (function(namespaces, rels, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships' + jade.attrs(jade.merge([ namespaces ]), false) + ">");
            (function() {
                var $obj = rels;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var rel = $obj[$index];
                        buf.push("<Relationship" + jade.attr("Id", rel.rId, true, false) + jade.attr("Target", rel.target.indexOf("/") === 0 ? rel.target.slice(1) : rel.target, true, false) + jade.attr("Type", rel.type, true, false) + jade.attr("TargetMode", rel.targetMode, true, false) + "/>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var rel = $obj[$index];
                        buf.push("<Relationship" + jade.attr("Id", rel.rId, true, false) + jade.attr("Target", rel.target.indexOf("/") === 0 ? rel.target.slice(1) : rel.target, true, false) + jade.attr("Type", rel.type, true, false) + jade.attr("TargetMode", rel.targetMode, true, false) + "/>");
                    }
                }
            }).call(this);
            buf.push("</Relationships>");
        }).call(this, "namespaces" in locals_for_with ? locals_for_with.namespaces : typeof namespaces !== "undefined" ? namespaces : undefined, "rels" in locals_for_with ? locals_for_with.rels : typeof rels !== "undefined" ? rels : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // sharedStrings.jade compiled template
    templatizer["sharedStrings"] = function tmpl_sharedStrings(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(count, namespaces, strings, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst' + jade.attrs(jade.merge([ {
                count: jade.escape(count),
                uniqueCount: jade.escape(strings.length)
            }, namespaces ]), false) + ">");
            (function() {
                var $obj = strings;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var string = $obj[$index];
                        buf.push("<si>");
                        if (string) {
                            buf.push("<t>" + jade.escape((jade_interp = string) == null ? "" : jade_interp) + "</t>");
                        } else {
                            buf.push("<t/>");
                        }
                        buf.push("</si>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var string = $obj[$index];
                        buf.push("<si>");
                        if (string) {
                            buf.push("<t>" + jade.escape((jade_interp = string) == null ? "" : jade_interp) + "</t>");
                        } else {
                            buf.push("<t/>");
                        }
                        buf.push("</si>");
                    }
                }
            }).call(this);
            buf.push("</sst>");
        }).call(this, "count" in locals_for_with ? locals_for_with.count : typeof count !== "undefined" ? count : undefined, "namespaces" in locals_for_with ? locals_for_with.namespaces : typeof namespaces !== "undefined" ? namespaces : undefined, "strings" in locals_for_with ? locals_for_with.strings : typeof strings !== "undefined" ? strings : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // styles.jade compiled template
    templatizer["styles"] = function tmpl_styles(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(Object, borders, cellStyles, fills, fonts, namespaces, numberFormats, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet' + jade.attrs(jade.merge([ {
                "mc:Ignorable": "x14ac"
            }, namespaces ]), false) + "><numFmts" + jade.attr("count", numberFormats.length, true, false) + ">");
            (function() {
                var $obj = numberFormats;
                if ("number" == typeof $obj.length) {
                    for (var n = 0, $l = $obj.length; n < $l; n++) {
                        var locale = $obj[n];
                        buf.push("<numFmt" + jade.attr("numFmtId", 200 + n, true, false) + jade.attr("formatCode", locale.format, false, false) + "></numFmt>");
                    }
                } else {
                    var $l = 0;
                    for (var n in $obj) {
                        $l++;
                        var locale = $obj[n];
                        buf.push("<numFmt" + jade.attr("numFmtId", 200 + n, true, false) + jade.attr("formatCode", locale.format, false, false) + "></numFmt>");
                    }
                }
            }).call(this);
            buf.push("</numFmts><fonts" + jade.attr("count", fonts.length, true, false) + ' x14ac:knownFonts="1">');
            (function() {
                var $obj = fonts;
                if ("number" == typeof $obj.length) {
                    for (var o = 0, $l = $obj.length; o < $l; o++) {
                        var font = $obj[o];
                        buf.push("<font>");
                        buf.push(templatizer["styles"]["attrTags"](font));
                        (function() {
                            var $obj = [ "name", "size", "scheme", "family" ];
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var tag = $obj[$index];
                                    if (font[tag]) {
                                        buf.push(templatizer["styles"]["valTag"](tag, font[tag]));
                                    }
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var tag = $obj[$index];
                                    if (font[tag]) {
                                        buf.push(templatizer["styles"]["valTag"](tag, font[tag]));
                                    }
                                }
                            }
                        }).call(this);
                        if (font.color) {
                            buf.push("<color" + jade.attrs(jade.merge([ font.color ]), false) + "/>");
                        }
                        if (font.subscript || font.superscript) {
                            buf.push("<vertAlign" + jade.attr("val", font.subscript ? "subscript" : "superscript", true, false) + "/>");
                        }
                        buf.push("</font>");
                    }
                } else {
                    var $l = 0;
                    for (var o in $obj) {
                        $l++;
                        var font = $obj[o];
                        buf.push("<font>");
                        buf.push(templatizer["styles"]["attrTags"](font));
                        (function() {
                            var $obj = [ "name", "size", "scheme", "family" ];
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var tag = $obj[$index];
                                    if (font[tag]) {
                                        buf.push(templatizer["styles"]["valTag"](tag, font[tag]));
                                    }
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var tag = $obj[$index];
                                    if (font[tag]) {
                                        buf.push(templatizer["styles"]["valTag"](tag, font[tag]));
                                    }
                                }
                            }
                        }).call(this);
                        if (font.color) {
                            buf.push("<color" + jade.attrs(jade.merge([ font.color ]), false) + "/>");
                        }
                        if (font.subscript || font.superscript) {
                            buf.push("<vertAlign" + jade.attr("val", font.subscript ? "subscript" : "superscript", true, false) + "/>");
                        }
                        buf.push("</font>");
                    }
                }
            }).call(this);
            buf.push("</fonts><fills" + jade.attr("count", fills.length, true, false) + ">");
            (function() {
                var $obj = fills;
                if ("number" == typeof $obj.length) {
                    for (var l = 0, $l = $obj.length; l < $l; l++) {
                        var fill = $obj[l];
                        buf.push("<fill>");
                        if (fill.type === "pattern") {
                            buf.push("<patternFill" + jade.attr("patternType", fill.pattern || "solid", true, false) + ">");
                            if (fill.pattern === "solid" || fill.color) {
                                buf.push("<fgColor" + jade.attrs(jade.merge([ fill.fgColor || fill.color ]), false) + "/>");
                            }
                            if (fill.bgColor) {
                                buf.push("<bgColor" + jade.attrs(jade.merge([ fill.bgColor ]), false) + "/>");
                            }
                            buf.push("</patternFill>");
                        }
                        if (fill.type === "gradient") {
                            buf.push("<gradientFill" + jade.attrs(jade.merge([ fill.gradient ]), false) + "></gradientFill>");
                        }
                        buf.push("</fill>");
                    }
                } else {
                    var $l = 0;
                    for (var l in $obj) {
                        $l++;
                        var fill = $obj[l];
                        buf.push("<fill>");
                        if (fill.type === "pattern") {
                            buf.push("<patternFill" + jade.attr("patternType", fill.pattern || "solid", true, false) + ">");
                            if (fill.pattern === "solid" || fill.color) {
                                buf.push("<fgColor" + jade.attrs(jade.merge([ fill.fgColor || fill.color ]), false) + "/>");
                            }
                            if (fill.bgColor) {
                                buf.push("<bgColor" + jade.attrs(jade.merge([ fill.bgColor ]), false) + "/>");
                            }
                            buf.push("</patternFill>");
                        }
                        if (fill.type === "gradient") {
                            buf.push("<gradientFill" + jade.attrs(jade.merge([ fill.gradient ]), false) + "></gradientFill>");
                        }
                        buf.push("</fill>");
                    }
                }
            }).call(this);
            buf.push("</fills><borders" + jade.attr("count", borders.length, true, false) + ">");
            (function() {
                var $obj = borders;
                if ("number" == typeof $obj.length) {
                    for (var r = 0, $l = $obj.length; r < $l; r++) {
                        var border = $obj[r];
                        if (!border || Object.keys(border).length === 1) {
                            buf.push("<border/>");
                        } else {
                            buf.push("<border>");
                            if (border.left) {
                                buf.push("<left" + jade.attr("style", border.left.style, true, false) + ">");
                                if (border.left.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.left.color ]), false) + "/>");
                                }
                                buf.push("</left>");
                            } else {
                                buf.push("<left/>");
                            }
                            if (border.right) {
                                buf.push("<right" + jade.attr("style", border.right.style, true, false) + ">");
                                if (border.right.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.right.color ]), false) + "/>");
                                }
                                buf.push("</right>");
                            } else {
                                buf.push("<right/>");
                            }
                            if (border.top) {
                                buf.push("<top" + jade.attr("style", border.top.style, true, false) + ">");
                                if (border.top.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.top.color ]), false) + "/>");
                                }
                                buf.push("</top>");
                            } else {
                                buf.push("<top/>");
                            }
                            if (border.bottom) {
                                buf.push("<bottom" + jade.attr("style", border.bottom.style, true, false) + ">");
                                if (border.bottom.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.bottom.color ]), false) + "/>");
                                }
                                buf.push("</bottom>");
                            } else {
                                buf.push("<bottom/>");
                            }
                            if (border.diagonal) {
                                buf.push("<diagonal" + jade.attr("style", border.diagonal.style, true, false) + ">");
                                if (border.diagonal.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.diagonal.color ]), false) + "/>");
                                }
                                buf.push("</diagonal>");
                            } else {
                                buf.push("<diagonal/>");
                            }
                            buf.push("</border>");
                        }
                    }
                } else {
                    var $l = 0;
                    for (var r in $obj) {
                        $l++;
                        var border = $obj[r];
                        if (!border || Object.keys(border).length === 1) {
                            buf.push("<border/>");
                        } else {
                            buf.push("<border>");
                            if (border.left) {
                                buf.push("<left" + jade.attr("style", border.left.style, true, false) + ">");
                                if (border.left.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.left.color ]), false) + "/>");
                                }
                                buf.push("</left>");
                            } else {
                                buf.push("<left/>");
                            }
                            if (border.right) {
                                buf.push("<right" + jade.attr("style", border.right.style, true, false) + ">");
                                if (border.right.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.right.color ]), false) + "/>");
                                }
                                buf.push("</right>");
                            } else {
                                buf.push("<right/>");
                            }
                            if (border.top) {
                                buf.push("<top" + jade.attr("style", border.top.style, true, false) + ">");
                                if (border.top.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.top.color ]), false) + "/>");
                                }
                                buf.push("</top>");
                            } else {
                                buf.push("<top/>");
                            }
                            if (border.bottom) {
                                buf.push("<bottom" + jade.attr("style", border.bottom.style, true, false) + ">");
                                if (border.bottom.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.bottom.color ]), false) + "/>");
                                }
                                buf.push("</bottom>");
                            } else {
                                buf.push("<bottom/>");
                            }
                            if (border.diagonal) {
                                buf.push("<diagonal" + jade.attr("style", border.diagonal.style, true, false) + ">");
                                if (border.diagonal.color) {
                                    buf.push("<color" + jade.attrs(jade.merge([ border.diagonal.color ]), false) + "/>");
                                }
                                buf.push("</diagonal>");
                            } else {
                                buf.push("<diagonal/>");
                            }
                            buf.push("</border>");
                        }
                    }
                }
            }).call(this);
            buf.push('</borders><cellStyleXfs count="1"><xf borderId="0" fillId="0" fontId="0" numFmtId="0"/></cellStyleXfs><cellXfs' + jade.attr("count", cellStyles.length, true, false) + ">");
            (function() {
                var $obj = cellStyles;
                if ("number" == typeof $obj.length) {
                    for (var t = 0, $l = $obj.length; t < $l; t++) {
                        var style = $obj[t];
                        var fontId = "font" in style && style.font || 0;
                        var fillId = "fill" in style && style.fill || 0;
                        var borderId = "border" in style && style.border || 0;
                        var numberFormat = "numberFormat" in style && style.numberFormat + 200 || 0;
                        if (!style || Object.keys(style).length === 1) {
                            buf.push("<xf/>");
                        } else {
                            buf.push("<xf" + jade.attr("applyBorder", borderId && 1 || void 0, true, false) + jade.attr("applyFill", fillId && 1 || void 0, true, false) + jade.attr("applyNumberFormat", numberFormat && 1 || void 0, true, false) + jade.attr("borderId", borderId, true, false) + jade.attr("fillId", fillId, true, false) + jade.attr("fontId", fontId, true, false) + jade.attr("numFmtId", numberFormat, true, false) + ' xfId="0">');
                            if (style.alignment) {
                                buf.push("<alignment" + jade.attrs(jade.merge([ style.alignment ]), false) + "/>");
                            }
                            buf.push("</xf>");
                        }
                    }
                } else {
                    var $l = 0;
                    for (var t in $obj) {
                        $l++;
                        var style = $obj[t];
                        var fontId = "font" in style && style.font || 0;
                        var fillId = "fill" in style && style.fill || 0;
                        var borderId = "border" in style && style.border || 0;
                        var numberFormat = "numberFormat" in style && style.numberFormat + 200 || 0;
                        if (!style || Object.keys(style).length === 1) {
                            buf.push("<xf/>");
                        } else {
                            buf.push("<xf" + jade.attr("applyBorder", borderId && 1 || void 0, true, false) + jade.attr("applyFill", fillId && 1 || void 0, true, false) + jade.attr("applyNumberFormat", numberFormat && 1 || void 0, true, false) + jade.attr("borderId", borderId, true, false) + jade.attr("fillId", fillId, true, false) + jade.attr("fontId", fontId, true, false) + jade.attr("numFmtId", numberFormat, true, false) + ' xfId="0">');
                            if (style.alignment) {
                                buf.push("<alignment" + jade.attrs(jade.merge([ style.alignment ]), false) + "/>");
                            }
                            buf.push("</xf>");
                        }
                    }
                }
            }).call(this);
            buf.push('</cellXfs><cellStyles count="1"><cellStyle builtinId="0" name="Normal" xfId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0" defaultPivotStyle="PivotStyleMedium4" defaultTableStyle="TableStyleMedium9"/></styleSheet>');
        }).call(this, "Object" in locals_for_with ? locals_for_with.Object : typeof Object !== "undefined" ? Object : undefined, "borders" in locals_for_with ? locals_for_with.borders : typeof borders !== "undefined" ? borders : undefined, "cellStyles" in locals_for_with ? locals_for_with.cellStyles : typeof cellStyles !== "undefined" ? cellStyles : undefined, "fills" in locals_for_with ? locals_for_with.fills : typeof fills !== "undefined" ? fills : undefined, "fonts" in locals_for_with ? locals_for_with.fonts : typeof fonts !== "undefined" ? fonts : undefined, "namespaces" in locals_for_with ? locals_for_with.namespaces : typeof namespaces !== "undefined" ? namespaces : undefined, "numberFormats" in locals_for_with ? locals_for_with.numberFormats : typeof numberFormats !== "undefined" ? numberFormats : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // styles.jade:valTag compiled template
    templatizer["styles"]["valTag"] = function tmpl_styles_valTag(tag, val) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        var tagMap = {
            size: "sz"
        };
        buf.push("<" + (tagMap[tag] || tag) + jade.attr("val", val, true, false) + "/>");
        return buf.join("");
    };


    // styles.jade:attrTags compiled template
    templatizer["styles"]["attrTags"] = function tmpl_styles_attrTags(style) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        var attrTags = {
            bold: "b",
            italic: "i",
            strike: "strike",
            underline: "u"
        };
        (function() {
            var $obj = attrTags;
            if ("number" == typeof $obj.length) {
                for (var attr = 0, $l = $obj.length; attr < $l; attr++) {
                    var tag = $obj[attr];
                    if (style[attr]) {
                        buf.push(templatizer["styles"]["attrTag"](tag, style[attr]));
                    }
                }
            } else {
                var $l = 0;
                for (var attr in $obj) {
                    $l++;
                    var tag = $obj[attr];
                    if (style[attr]) {
                        buf.push(templatizer["styles"]["attrTag"](tag, style[attr]));
                    }
                }
            }
        }).call(this);
        return buf.join("");
    };


    // styles.jade:attrTag compiled template
    templatizer["styles"]["attrTag"] = function tmpl_styles_attrTag(tag, attrs) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        if (typeof attrs === "object") {
            buf.push("<" + tag + ">/&attributes(attrs)</" + tag + ">");
        } else {
            buf.push("<" + tag + "/>");
        }
        return buf.join("");
    };

    // workbook.jade compiled template
    templatizer["workbook"] = function tmpl_workbook(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(definedNames, hasDefinedNames, namespaces, sheets, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook' + jade.attrs(jade.merge([ namespaces ]), false) + "><sheets>");
            (function() {
                var $obj = sheets;
                if ("number" == typeof $obj.length) {
                    for (var i = 0, $l = $obj.length; i < $l; i++) {
                        var sheet = $obj[i];
                        buf.push("<sheet" + jade.attr("name", sheet.name, true, false) + jade.attr("r:id", sheet.rId, true, false) + jade.attr("sheetId", sheet.id, true, false) + "/>");
                    }
                } else {
                    var $l = 0;
                    for (var i in $obj) {
                        $l++;
                        var sheet = $obj[i];
                        buf.push("<sheet" + jade.attr("name", sheet.name, true, false) + jade.attr("r:id", sheet.rId, true, false) + jade.attr("sheetId", sheet.id, true, false) + "/>");
                    }
                }
            }).call(this);
            buf.push("</sheets>");
            if (hasDefinedNames) {
                buf.push("<definedNames>");
                (function() {
                    var $obj = definedNames;
                    if ("number" == typeof $obj.length) {
                        for (var name = 0, $l = $obj.length; name < $l; name++) {
                            var definedName = $obj[name];
                            buf.push("<definedName" + jade.attr("localSheetId", definedName.id, true, false) + jade.attr("name", name, true, false) + ">" + jade.escape((jade_interp = definedName.value) == null ? "" : jade_interp) + "</definedName>");
                        }
                    } else {
                        var $l = 0;
                        for (var name in $obj) {
                            $l++;
                            var definedName = $obj[name];
                            buf.push("<definedName" + jade.attr("localSheetId", definedName.id, true, false) + jade.attr("name", name, true, false) + ">" + jade.escape((jade_interp = definedName.value) == null ? "" : jade_interp) + "</definedName>");
                        }
                    }
                }).call(this);
                buf.push("</definedNames>");
            }
            buf.push("</workbook>");
        }).call(this, "definedNames" in locals_for_with ? locals_for_with.definedNames : typeof definedNames !== "undefined" ? definedNames : undefined, "hasDefinedNames" in locals_for_with ? locals_for_with.hasDefinedNames : typeof hasDefinedNames !== "undefined" ? hasDefinedNames : undefined, "namespaces" in locals_for_with ? locals_for_with.namespaces : typeof namespaces !== "undefined" ? namespaces : undefined, "sheets" in locals_for_with ? locals_for_with.sheets : typeof sheets !== "undefined" ? sheets : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // worksheet.jade compiled template
    templatizer["worksheet"] = function tmpl_worksheet(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(cols, dimension, drawings, hyperlinks, merges, namespaces, panes, part, rows, selection, undefined) {
            buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet' + jade.attrs(jade.merge([ {
                "mc:Ignorable": "x14ac"
            }, namespaces ]), false) + "><dimension" + jade.attr("ref", dimension, true, false) + "/>");
            if (locals.pane || locals.selection) {
                buf.push('<sheetViews><sheetView workbookViewId="0">');
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
                buf.push("</sheetView></sheetViews>");
            }
            buf.push('<sheetFormatPr baseColWidth="10" defaultRowHeight="15" x14ac:dyDescent="0"></sheetFormatPr>');
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
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || void 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if ("formula" in cell) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        if ("inline" in cell) {
                                            buf.push("<is>");
                                            (function() {
                                                var $obj = cell.inline;
                                                if ("number" == typeof $obj.length) {
                                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                } else {
                                                    var $l = 0;
                                                    for (var $index in $obj) {
                                                        $l++;
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                }
                                            }).call(this);
                                            buf.push("</is>");
                                        }
                                        buf.push("</c>");
                                    }
                                } else {
                                    var $l = 0;
                                    for (var $index in $obj) {
                                        $l++;
                                        var cell = $obj[$index];
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || void 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if ("formula" in cell) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        if ("inline" in cell) {
                                            buf.push("<is>");
                                            (function() {
                                                var $obj = cell.inline;
                                                if ("number" == typeof $obj.length) {
                                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                } else {
                                                    var $l = 0;
                                                    for (var $index in $obj) {
                                                        $l++;
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                }
                                            }).call(this);
                                            buf.push("</is>");
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
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || void 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if ("formula" in cell) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        if ("inline" in cell) {
                                            buf.push("<is>");
                                            (function() {
                                                var $obj = cell.inline;
                                                if ("number" == typeof $obj.length) {
                                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                } else {
                                                    var $l = 0;
                                                    for (var $index in $obj) {
                                                        $l++;
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                }
                                            }).call(this);
                                            buf.push("</is>");
                                        }
                                        buf.push("</c>");
                                    }
                                } else {
                                    var $l = 0;
                                    for (var $index in $obj) {
                                        $l++;
                                        var cell = $obj[$index];
                                        buf.push("<c" + jade.attr("r", cell.ref, true, false) + jade.attr("s", cell.style || void 0, true, false) + jade.attr("t", cell.type, true, false) + ">");
                                        if ("formula" in cell) {
                                            buf.push("<f>" + jade.escape((jade_interp = cell.formula) == null ? "" : jade_interp) + "</f>");
                                        }
                                        if ("value" in cell) {
                                            buf.push("<v>" + jade.escape((jade_interp = cell.value) == null ? "" : jade_interp) + "</v>");
                                        }
                                        if ("inline" in cell) {
                                            buf.push("<is>");
                                            (function() {
                                                var $obj = cell.inline;
                                                if ("number" == typeof $obj.length) {
                                                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                } else {
                                                    var $l = 0;
                                                    for (var $index in $obj) {
                                                        $l++;
                                                        var part = $obj[$index];
                                                        if (part.style) {
                                                            buf.push(templatizer["worksheet"]["richTextStyle"](part.style, part.text));
                                                        } else {
                                                            buf.push('<t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t>");
                                                        }
                                                    }
                                                }
                                            }).call(this);
                                            buf.push("</is>");
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
            if (locals.drawings) {
                (function() {
                    var $obj = drawings;
                    if ("number" == typeof $obj.length) {
                        for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                            var drawing = $obj[$index];
                            buf.push("<drawing" + jade.attr("r:id", drawing.rId, true, false) + "></drawing>");
                        }
                    } else {
                        var $l = 0;
                        for (var $index in $obj) {
                            $l++;
                            var drawing = $obj[$index];
                            buf.push("<drawing" + jade.attr("r:id", drawing.rId, true, false) + "></drawing>");
                        }
                    }
                }).call(this);
            }
            buf.push("</worksheet>");
        }).call(this, "cols" in locals_for_with ? locals_for_with.cols : typeof cols !== "undefined" ? cols : undefined, "dimension" in locals_for_with ? locals_for_with.dimension : typeof dimension !== "undefined" ? dimension : undefined, "drawings" in locals_for_with ? locals_for_with.drawings : typeof drawings !== "undefined" ? drawings : undefined, "hyperlinks" in locals_for_with ? locals_for_with.hyperlinks : typeof hyperlinks !== "undefined" ? hyperlinks : undefined, "merges" in locals_for_with ? locals_for_with.merges : typeof merges !== "undefined" ? merges : undefined, "namespaces" in locals_for_with ? locals_for_with.namespaces : typeof namespaces !== "undefined" ? namespaces : undefined, "panes" in locals_for_with ? locals_for_with.panes : typeof panes !== "undefined" ? panes : undefined, "part" in locals_for_with ? locals_for_with.part : typeof part !== "undefined" ? part : undefined, "rows" in locals_for_with ? locals_for_with.rows : typeof rows !== "undefined" ? rows : undefined, "selection" in locals_for_with ? locals_for_with.selection : typeof selection !== "undefined" ? selection : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // worksheet.jade:richTextStyle compiled template
    templatizer["worksheet"]["richTextStyle"] = function tmpl_worksheet_richTextStyle(style, text) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        buf.push("<r><rPr>");
        buf.push(templatizer["worksheet"]["attrTags"](style));
        if (style.size) {
            buf.push("<sz" + jade.attr("val", style.size, true, false) + "></sz>");
        }
        if (style.color) {
            buf.push("<color" + jade.attrs(jade.merge([ style.color || {
                rgb: "FF000000"
            } ]), false) + "></color>");
        }
        buf.push("<rFont" + jade.attr("val", style.font || "Calibri", true, false) + "></rFont><family" + jade.attr("val", style.family || 2, true, false) + '></family></rPr><t xml:space="preserve">' + jade.escape((jade_interp = part.text) == null ? "" : jade_interp) + "</t></r>");
        return buf.join("");
    };


    // worksheet.jade:attrTags compiled template
    templatizer["worksheet"]["attrTags"] = function tmpl_worksheet_attrTags(style) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        var attrTags = {
            bold: "b",
            italic: "i",
            strike: "strike",
            underline: "u"
        };
        (function() {
            var $obj = attrTags;
            if ("number" == typeof $obj.length) {
                for (var attr = 0, $l = $obj.length; attr < $l; attr++) {
                    var tag = $obj[attr];
                    if (style[attr]) {
                        buf.push(templatizer["worksheet"]["attrTag"](tag, style[attr]));
                    }
                }
            } else {
                var $l = 0;
                for (var attr in $obj) {
                    $l++;
                    var tag = $obj[attr];
                    if (style[attr]) {
                        buf.push(templatizer["worksheet"]["attrTag"](tag, style[attr]));
                    }
                }
            }
        }).call(this);
        return buf.join("");
    };


    // worksheet.jade:attrTag compiled template
    templatizer["worksheet"]["attrTag"] = function tmpl_worksheet_attrTag(tag, attrs) {
        var block = this && this.block, attributes = this && this.attributes || {}, buf = [];
        if (typeof attrs === "object") {
            buf.push("<" + tag + ">/&attributes(attrs)</" + tag + ">");
        } else {
            buf.push("<" + tag + "/>");
        }
        return buf.join("");
    };

    // xml.jade compiled template
    templatizer["xml"] = function tmpl_xml() {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
    };

    return templatizer;
}));
