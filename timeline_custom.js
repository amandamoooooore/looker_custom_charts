//timeline
looker.plugins.visualizations.add({
    id: "custom_timeline",
    label: "Custom Timeline (Highcharts)",

    options: {
        boxCount: {
            type: "number",
            label: "Number of boxes",
            default: 5,
            min: 1,
            section: "Chart"
        },
        showSummary: {
            type: "boolean",
            label: "Show summary text",
            default: false,
            section: "Summary"
        },
        summaryText: {
            type: "string",
            label: "Summary text",
            default: "",
            section: "Summary"
        },
        startColor: {
            type: "string",
            label: "Gradient start color (hex)",
            default: "#2AA7FF",
            section: "Colors"
        },
        endColor: {
            type: "string",
            label: "Gradient end color (hex)",
            default: "#1D3B8B",
            section: "Colors"
        }
    },

    create: function (element) {
        element.innerHTML = `
      <style>
        .hc-timeline-wrap { width: 100%; height: 100%; }
      </style>
      <div class="hc-timeline-wrap"></div>
    `;
        this._container = element.querySelector(".hc-timeline-wrap");
        this._chart = null;
    },

    // -------- Gradient helpers --------
    _normalizeHex: function (hex) {
        if (!hex) return null;
        let h = String(hex).trim();
        if (!h.startsWith("#")) h = "#" + h;
        if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
        return /^#[0-9a-fA-F]{6}$/.test(h) ? h : null;
    },

    _hexToRgb: function (hex) {
        const h = hex.replace("#", "");
        return {
            r: parseInt(h.slice(0, 2), 16),
            g: parseInt(h.slice(2, 4), 16),
            b: parseInt(h.slice(4, 6), 16)
        };
    },

    _rgbToHex: function ({ r, g, b }) {
        const to2 = (n) =>
            Math.max(0, Math.min(255, Math.round(n)))
                .toString(16)
                .padStart(2, "0");
        return "#" + to2(r) + to2(g) + to2(b);
    },

    _lerpColor: function (startHex, endHex, t) {
        const a = this._hexToRgb(startHex);
        const b = this._hexToRgb(endHex);
        return this._rgbToHex({
            r: a.r + (b.r - a.r) * t,
            g: a.g + (b.g - a.g) * t,
            b: a.b + (b.b - a.b) * t
        });
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        const finish = () => typeof done === "function" && done();

        try {
            if (!queryResponse?.fields?.dimension_like?.length) {
                this._container.innerHTML = "No dimension fields found.";
                finish();
                return;
            }

            if (!data?.length) {
                this._container.innerHTML = "No data returned.";
                finish();
                return;
            }

            const dims = queryResponse.fields.dimension_like;
            const row = data[0];

            const readValue = (fieldName) => {
                const v = row[fieldName];
                if (v == null) return "";
                if (typeof v === "object") return v.rendered ?? v.value ?? "";
                return v;
            };

            const tileFieldNames = dims
                .map((d) => d.name)
                .filter((name) => name.endsWith("_tile"));

            const count = Math.max(
                1,
                Math.min(tileFieldNames.length, Number(config.boxCount) || tileFieldNames.length)
            );

            const chosenTileFields = tileFieldNames.slice(0, count);

            const startHex = this._normalizeHex(config.startColor) || "#2AA7FF";
            const endHex = this._normalizeHex(config.endColor) || "#1D3B8B";

            const total = chosenTileFields.length;
            const denom = Math.max(1, total - 1);

            const points = chosenTileFields.map((tileFieldName, idx) => {
                const tooltipFieldName = tileFieldName.replace(/_tile$/, "_tooltip");
                const t = idx / denom;
                const accentColor = this._lerpColor(startHex, endHex, t);

                return {
                    x: idx,
                    name: String(readValue(tileFieldName) ?? ""),
                    custom: { tooltipText: String(readValue(tooltipFieldName) ?? "") },

                    // marker color
                    color: accentColor,
                    marker: { fillColor: accentColor, lineColor: accentColor },

                    // No connector lines
                    connectorWidth: 0,

                    // Boxes always white; border uses accent
                    dataLabels: {
                        backgroundColor: "#FFFFFF",
                        borderColor: accentColor
                    }
                };
            });

            const showSummary = !!config.showSummary;

            const chartOptions = {
                chart: {
                    type: "timeline",
                    spacingBottom: showSummary ? 60 : 20,
                    animation: false
                },

                title: { text: null },
                subtitle: { text: null },

                caption: showSummary
                    ? {
                        text: config.summaryText || "",
                        align: "center",
                        verticalAlign: "bottom",
                        style: { fontSize: "12px" }
                    }
                    : { text: null },

                exporting: { enabled: false },
                credits: { enabled: false },
                legend: { enabled: false },

                xAxis: {
                    visible: false,
                    minPadding: 0.1,
                    maxPadding: 0.1
                },
                yAxis: { visible: false },

                tooltip: {
                    useHTML: true,
                    formatter: function () {
                        const fullHeader = this.point?.name || "";
                        const body = this.point?.custom?.tooltipText || "";

                        const idx = fullHeader.indexOf(":");

                        let formattedHeader = fullHeader;

                        if (idx !== -1) {
                            const left = fullHeader.substring(0, idx);      // left of :
                            const right = fullHeader.substring(idx);        // includes :

                            formattedHeader = `<strong>${left}</strong>${right}`;
                        }

                        return `
                      ${formattedHeader}
                      <br><br>
                      ${body}
                    `;
                    }
                },

                plotOptions: {
                    series: {
                        // timeline baseline settings (kept from your version)
                        lineWidth: 16,
                        lineColor: null,
                        borderWidth: 4,
                        borderColor: "#ffffff",
                        linecap: "square",

                        dataLabels: {
                            allowOverlap: true,
                            alternate: true,
                            borderRadius: 6,
                            borderWidth: 2,
                            padding: 10,
                            useHTML: true,
                            formatter: function () {
                                const text = this.point.name || "";

                                const idx = text.indexOf(":");

                                if (idx === -1) {
                                    return text; // no colon → leave unchanged
                                }

                                const left = text.substring(0, idx + 1);
                                const right = text.substring(idx + 1);

                                return `<strong>${left}</strong>${right}`;
                            },
                            style: {
                                textOutline: "none",
                                color: "#222"
                            }
                        },

                        marker: {
                            enabled: true,
                            radius: 6
                        }
                    }
                },

                series: [{ data: points }]
            };

            if (this._chart) {
                this._chart.update(chartOptions, true, true, false);
            } else {
                this._chart = Highcharts.chart(this._container, chartOptions);
            }

            finish();
        } catch (err) {
            this._container.innerHTML = `Error: ${err?.message || err}`;
            finish();
        }
    }
});
