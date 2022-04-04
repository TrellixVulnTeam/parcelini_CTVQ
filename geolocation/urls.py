from django.urls import path
from . import views


urlpatterns = [
    path(
        "api/<str:username>/get_seismic_info/<str:address_slug>",
        views.SeisimicInfo.as_view(),
    ),
    path(
        "api/<str:username>/get_hillside_slope/<str:address_slug>",
        views.HillsideInfo.as_view(),
    ),
    path(
        "api/<str:username>/get_mb_building_footprints/<str:address_slug>",
        views.MapboxBuildingFootprints.as_view(),
    ),
    path(
        "api/<str:username>/get_flood_plain_info/<str:address_slug>",
        views.FloodPlainInfo.as_view(),
    ),
    path(
        "api/<str:username>/get_fema_flood_zones_info/<str:address_slug>",
        views.FemaFloodZonesInfo.as_view(),
    ),
    path(
        "api/<str:username>/fire_hazard_info/<str:address_slug>",
        views.FireHazardInfo.as_view(),
    ),
]
