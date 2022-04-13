from django.urls import path
from . import views

urlpatterns = [
    path("api/get_parcel_info/<str:address_slug>", views.ParcelInfo.as_view()),
    path("api/get_basic_info/<str:address_slug>", views.BasicInfo.as_view()),
    path(
        "api/<str:username>/get_zoning_info/<str:address_slug>",
        views.ZoningInfo.as_view(),
    ),
    path(
        "api/<str:username>/get_parcel_polygon/<str:address_slug>",
        views.ParcelPolygon.as_view(),
    ),
    path(
        "api/<str:username>/get_backyard_polygon/<str:address_slug>",
        views.BackyardPolygon.as_view(),
    ),
    path(
        "api/<str:username>/get_hazard_analysis/<str:address_slug>",
        views.HazardAnalysis.as_view(),
    ),
    path(
        "api/<str:username>/get_front_street_details/<str:address_slug>",
        views.FrontStreet.as_view(),
    ),
    path(
        "api/<str:username>/is_at_cul_de_sac/<str:address_slug>",
        views.IsAtCulDeSac.as_view(),
    ),
    path(
        "api/<str:username>/back_street_or_alley_present/<str:address_slug>",
        views.BackStreetOrAlleyPresent.as_view(),
    ),
    path(
        "api/<str:username>/is_corner_lot/<str:address_slug>",
        views.IsCornerLot.as_view(),
    ),
    path(
        "api/<str:username>/is_reversed_corner_lot/<str:address_slug>",
        views.IsReversedCornerLot.as_view(),
    ),
    path(
        "api/<str:username>/get_parcel_sides/<str:address_slug>",
        views.ParcelSides.as_view(),
    ),
]
