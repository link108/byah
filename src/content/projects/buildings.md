---
title: buildings
status: prototype
summary: CadQuery model that rebuilds a scanned roof-plan drawing into an editable, parametric house model, wall by wall.
stack:
  - Python
  - CadQuery
links:
  - label: Source
    url: https://github.com/link108/buildings
featured: false
---

**tl;dr**: I started this because I had an STL of a house's roof plan that was really just a flattened SketchUp export, and I wanted an actual editable model instead of a shape I couldn't touch.

The STL turned out to be a 2D roof/floor-plan drawing, not a real 3D house — about 2,000 triangles, mostly flat, with the diagonal lines just hip/ridge/valley guides. So instead of trying to parse geometry back out of that mesh, I rebuilt it by hand: explicit wall centerlines and explicit corner joints in a small Python script, using the same CadQuery environment as [reliquary-works](/projects/reliquary-works/).

```text
 house.stl (SketchUp export,
 a 2D plan, not real 3D)
        |
        v
 WALLS[] + JOINTS[]  (hand-edited centerlines)
        |
        v
 house_cadquery.py
        |
        v
 STEP/STL + wall_index.csv
```

Most corners snap to 90 degrees on purpose, and the README says outright not to trust this for construction or permits until the dimensions are checked against the real building. It's a rebuild, not a survey — good enough to explore the model in CAD, not good enough to hand to a contractor yet.
