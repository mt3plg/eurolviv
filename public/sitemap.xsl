<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>eurohotel sitemap</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 32px;
            color: #252526;
            background: #ffffff;
          }
          h1 {
            margin-bottom: 8px;
            font-size: 28px;
          }
          p {
            margin-bottom: 24px;
            color: #6b6b6b;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #d9d9d9;
            padding: 12px;
            text-align: left;
            vertical-align: top;
          }
          th {
            background: #f5f5f5;
          }
          a {
            color: #8c331b;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          ul {
            margin: 0;
            padding-left: 18px;
          }
          li + li {
            margin-top: 6px;
          }
        </style>
      </head>
      <body>
        <h1>eurohotel sitemap</h1>
        <p>urls and hreflang alternates exposed for search engines.</p>

        <table>
          <thead>
            <tr>
              <th>url</th>
              <th>alternates</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc" />
                  </a>
                </td>
                <td>
                  <ul>
                    <xsl:for-each select="xhtml:link">
                      <li>
                        <strong>
                          <xsl:value-of select="@hreflang" />
                        </strong>
                        <xsl:text>: </xsl:text>
                        <a href="{@href}">
                          <xsl:value-of select="@href" />
                        </a>
                      </li>
                    </xsl:for-each>
                  </ul>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
