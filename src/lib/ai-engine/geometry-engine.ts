/**
 * RUHARC AI Engine — Dimension & Geometry Intelligence Engine (Part 03 & Part 05)
 * Version 1.0.0
 * 
 * Manages structured parametric graph data for architectural elements:
 * Rooms, Walls, Openings (Doors/Windows), Furniture, and Annotations.
 */

export interface RoomEntity {
  id: string;
  name: string;
  category: "Living" | "Bedroom" | "Kitchen" | "Bathroom" | "Outdoor" | "Office";
  widthFt: number;
  lengthFt: number;
  heightFt: number;
  areaSqFt: number;
  wallMaterial: string;
  floorFinish: string;
}

export interface GeometryValidationAlert {
  severity: "Info" | "Warning" | "Critical";
  message: string;
  affectedRoom: string;
  recommendation: string;
}

export class GeometryIntelligenceEngine {
  private rooms: Map<string, RoomEntity> = new Map();

  constructor() {
    // Populate base sample rooms
    this.addRoom({
      id: "r1",
      name: "Master Bedroom",
      category: "Bedroom",
      widthFt: 16,
      lengthFt: 18,
      heightFt: 10,
      areaSqFt: 288,
      wallMaterial: "AAC Lightweight Blocks",
      floorFinish: "Engineered Natural Oak",
    });

    this.addRoom({
      id: "r2",
      name: "Living Room",
      category: "Living",
      widthFt: 22,
      lengthFt: 20,
      heightFt: 11.5,
      areaSqFt: 440,
      wallMaterial: "Acoustic Plasterboard",
      floorFinish: "Polished Architectural Concrete",
    });
  }

  public addRoom(room: RoomEntity) {
    this.rooms.set(room.id, room);
  }

  public getRoom(id: string): RoomEntity | undefined {
    return this.rooms.get(id);
  }

  public getAllRooms(): RoomEntity[] {
    return Array.from(this.rooms.values());
  }

  /**
   * PARAMETRIC EDIT (Part 03 Conversational Edit Engine)
   */
  public resizeRoom(id: string, deltaWidthFt: number, deltaLengthFt: number): RoomEntity | undefined {
    const room = this.rooms.get(id);
    if (!room) return undefined;

    room.widthFt = Math.max(4, room.widthFt + deltaWidthFt);
    room.lengthFt = Math.max(4, room.lengthFt + deltaLengthFt);
    room.areaSqFt = room.widthFt * room.lengthFt;

    this.rooms.set(id, room);
    return room;
  }

  /**
   * GEOMETRY VALIDATION & BUILDING CODE INSPECTION
   */
  public inspectGeometry(): GeometryValidationAlert[] {
    const alerts: GeometryValidationAlert[] = [];

    this.rooms.forEach((room) => {
      // Check for minimum hallway / room clearance
      if (room.widthFt < 6) {
        alerts.push({
          severity: "Warning",
          affectedRoom: room.name,
          message: `Room width (${room.widthFt} ft) is below recommended clearance threshold.`,
          recommendation: "Increase width by at least 2.0 ft for comfortable circulation.",
        });
      }

      // Check ceiling height proportion
      if (room.heightFt < 8.5) {
        alerts.push({
          severity: "Critical",
          affectedRoom: room.name,
          message: `Ceiling height (${room.heightFt} ft) violates standard residential building code minimum (8.5 ft).`,
          recommendation: "Elevate ceiling height to 9.0 ft minimum.",
        });
      }
    });

    return alerts;
  }

  /**
   * UNIT CONVERSION UTILITY
   */
  public static convertSqFtToSqM(sqFt: number): number {
    return Math.round(sqFt * 0.092903 * 100) / 100;
  }
}
