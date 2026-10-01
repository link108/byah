---
title: buildings
status: prototype
summary: CadQuery script that rebuilds a flat SketchUp roof plan as an editable 3D wall model.
stack:
  - Python
  - CadQuery
links:
  - label: Source
    url: https://github.com/link108/buildings
featured: false
---

I had a `house.stl` that looked like a house model. It was really a SketchUp export
of a 2D roof and floor plan: 1,991 triangles, mostly at three heights (0, 97, and
194 inches), and the diagonal lines were hip, ridge, and valley guides. If the units
are inches, the footprint is about 182 by 107 feet.

Rather than try to pull walls out of that mesh, `house_cadquery.py` defines them by
hand. Each wall is a 6-inch-wide centerline (`Wall("W001", x1, y1, x2, y2)`), and
corners are declared separately as joints. Running it produces STEP and STL files for
the whole house, separate files for the wall plan, bodies, and labels, and a
`wall_index.csv` with every wall's coordinates and length. It uses the same Conda
CadQuery environment as [reliquary-works](/projects/reliquary-works/).

Most corners are snapped to 90 degrees. The roof lines aren't modeled yet. Don't use
it for anything structural until the dimensions have been checked against the actual
building.
