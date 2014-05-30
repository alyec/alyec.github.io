---
layout: index-en
title: doc - Naming Conventions
category: Documentation
categories: Documentation documentation
tags: doc
---
{% include JB/setup %}

## RAMP Naming Conventions

Resource dictionary = a singleton object that only contain read-only fields (in C# or Java, these would be classes that cannot be instantiated and only contain public static fields)

Utilities = a singleton object that contain useful functions but does not contain any fields (in C# or Java, these would be classes that cannot be instantiated and only contain public static functions) 

Singleton object = a singleton object that contains both fields and functions (in C# or Java, these would be classes that cannot be instantiated, have static fields, and static functions). These are the only objects can have states that change over time (e.g. Map can have different extents, Datagrid can have different points, whereas the Resource dictionary never changes, neither do the Utility classes).

