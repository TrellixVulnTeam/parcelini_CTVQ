import requests

from geolocation.addressing import get_lat_lng_from_address
from geolocation.parcel_info import get_parcel_info_ca_1


codes = {
    "FaultZone": {
        "0": "This parcel is NOT WITHIN an Earthquake Fault Zone.",
        "1": "All or a portion of this parcel LIES WITHIN an Earthquake Fault Zone.",
    },
    "LandslideZone": {
        "0": "This parcel has NOT been EVALUATED by CGS for seismic landslide hazards.",
        "1": "Not all of this parcel has been evaluated by CGS for landslide hazards.",
        "2": "This parcel is NOT WITHIN a Landslide Zone.",
        "3": "This parcel LIES WITHIN a Landslide Zone.",
    },
    "LiquefactionZone": {
        "0": "This parcel has NOT been EVALUATED by CGS for liquefaction hazards.",
        "1": "Not all of this parcel has been evaluated by CGS for liquefaction hazards.",
        "2": "This parcel is NOT WITHIN a Liquefaction Zone.",
        "3": "This parcel LIES WITHIN a Liquefaction Zone.",
    },
}

source_1 = "https://services2.arcgis.com/zr3KAIbsRSUyARHG/ArcGIS/rest/services"
source_2 = "https://gis.conservation.ca.gov/server/rest/services"


def get_seisimic_zone_ca_info(address):
    data = get_parcel_info_ca_1(address)
    data["FaultZoneInfo"] = codes["FaultZone"][
        data["features"][0]["properties"]["FaultZone"]
    ]
    data["LandslideZoneInfo"] = codes["LandslideZone"][
        data["features"][0]["properties"]["LandslideZone"]
    ]
    data["LiquefactionZoneInfo"] = codes["LiquefactionZone"][
        data["features"][0]["properties"]["LiquefactionZone"]
    ]
    return data


source_1 = "https://egis.fire.ca.gov/arcgis/rest/services/FRAP"
source_2 = "https://services.gis.ca.gov/arcgis/rest/services/Environment"


def get_fire_hazard_zones_ca(address):
    coords = get_lat_lng_from_address(address)
    query_args = f"?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry={coords['lng']}%2C{coords['lat']}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson"
    url_lra = "https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer/1/query"
    url_sra = "https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer/0/query"
    url_fra = "https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer/3/query"
    url_awaiting = "https://services.gis.ca.gov/arcgis/rest/services/Environment/Fire_Severity_Zones/MapServer/2/query"

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
    }

    r_lra = requests.get(url_lra + query_args, headers=headers)
    r_sra = requests.get(url_sra + query_args, headers=headers)
    r_fra = requests.get(url_fra + query_args, headers=headers)
    r_await = requests.get(url_awaiting + query_args, headers=headers)

    data = {}
    data["lra"] = r_lra.json()
    data["sra"] = r_sra.json()
    data["fra"] = r_fra.json()
    data["awaiting"] = r_await.json()

    return data


source_1 = "https://gis.water.ca.gov/arcgis/rest/services/Boundaries"
source_2 = "https://gisweb-adapters.bcpa.net/arcgis/rest/services/BCPA_INTERNAL_OCT21/MapServer/7"
source_3 = "https://hazards.fema.gov/gis/nfhl/rest/services/FIRMette/NFHLREST_FIRMette/MapServer"
source_4 = "https://gispublic.waterboards.ca.gov/arcgis/rest/services"


def get_fema_flood_zones_national(address):
    coords = get_lat_lng_from_address(address)

    query_args = f"?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry={coords['lng']}%2C{coords['lat']}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson"
    url = "https://hazards.fema.gov/gis/nfhl/rest/services/FIRMette/NFHLREST_FIRMette/MapServer/20/query"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
    }

    r = requests.get(url + query_args, headers=headers)
    return r.json()


def get_floodplains_ca(address):
    coords = get_lat_lng_from_address(address)

    query_args = f"?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry={coords['lng']}%2C{coords['lat']}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson"
    url_100_year = "https://gis.water.ca.gov/arcgis/rest/services/Boundaries/bam_viewer/MapServer/5/query"
    # url_200_year = "https://gis.water.ca.gov/arcgis/rest/services/Boundaries/bam_viewer/MapServer/11/query"
    url_500_year = "https://gis.water.ca.gov/arcgis/rest/services/Boundaries/bam_viewer/MapServer/13/query"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
    }

    r_100 = requests.get(url_100_year + query_args, headers=headers)
    # r_200 = requests.get(url_200_year + query_args, headers=headers)
    r_500 = requests.get(url_500_year + query_args, headers=headers)

    data = {}
    data["100_year_floodplain"] = r_100.json()
    # data["200_year_floodplain"] = r_200.json()
    data["500_year_floodplain"] = r_500.json()
    return data
